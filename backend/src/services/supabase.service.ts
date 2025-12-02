import { createClient, SupabaseClient } from '@supabase/supabase-js';

const tables = {
  USERS: 'usuarios_dashboard',
  LEADS: 'leads_dashboard',
};

class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.DATABASE_URL || '',
      process.env.SUPABASE_APIKEY || ''
    );
  }

  private getToday = (): string => {
    const d = new Date();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  };

  public async getUserData(email: string, id_empresa: number): Promise<any> {
    // Lógica para obtener los datos del usuario desde Supabase
    const { data, error } = await this.supabase
      .from(tables.USERS)
      .select('*')
      .eq('email', email)
      .eq('empresa', id_empresa)
      .single();

    if (error) {
      return undefined;
    }
    return data;
  }

  public async registerLogin(userId: string): Promise<void> {
    await this.supabase
      .from(tables.USERS)
      .update({ last_login: new Date() })
      .eq('id', userId);
  }

  public async createUser(userData: {
    email: string;
    password: string;
    id_empresa: number;
  }): Promise<void> {
    const { data, error } = await this.supabase.from(tables.USERS).insert([
      {
        email: userData.email,
        password: userData.password,
        status: true,
        empresa: userData.id_empresa,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }
  }

  public async getLeadsPorDia(
    red_social: number,
    empresa_id?: number,
    first_day?: string,
    last_date?: string
  ): Promise<any> {
    try {
      // Seleccionamos empresa, tipo_lead y contador para sumar
      const query = this.supabase
        .from(tables.LEADS)
        .select('empresa,tipo_lead,contador');
      const today = this.getToday();

      // Filtro por red_social: si es 0 -> todas las redes (no filtramos)
      if (
        typeof red_social === 'number' &&
        red_social !== 0 &&
        !isNaN(Number(red_social))
      ) {
        query.eq('red_social', red_social);
      }

      // Filtro por empresa si se pasó empresa_id
      if (
        empresa_id !== undefined &&
        empresa_id !== null &&
        String(empresa_id) !== 'undefined'
      ) {
        query.eq('empresa', empresa_id);
      }

      // Manejo de fechas: si se pasan 'undefined' (como string) o undefined, usamos today
      if (first_day !== undefined && first_day !== 'undefined') {
        query.gte('created_at', first_day);
      } else {
        query.gte('created_at', today);
      }

      if (last_date !== undefined && last_date !== 'undefined') {
        query.lte('created_at', last_date);
      } else {
        query.lte('created_at', today);
      }
      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }
      // Si no hay datos, devolvemos arreglo vacío
      // Asegurarnos de tener un arreglo (si no, lo normalizamos a arreglo vacío)
      const rows = Array.isArray(data) ? data : [];

      // Agrupar y sumar los contadores por tipo_lead
      const sums: Record<number, number> = {};
      for (const row of rows) {
        const tipo = Number((row as any).tipo_lead) || 0;
        const contador = Number((row as any).contador) || 0;
        sums[tipo] = (sums[tipo] || 0) + contador;
      }

      const { data: dataEmpresa, error: errorEmpresa } = await this.supabase
        .from('empresas_dashboard')
        .select('empresa')
        .eq('id', empresa_id)
        .single();

      if (errorEmpresa) {
        throw new Error(errorEmpresa.message);
      }

      // Mapear tipo_lead: 1 -> dm, 2 -> publicidad
      const leads_dm = sums[1] || 0;
      const leads_publicidad = sums[2] || 0;

      // Devolvemos un arreglo con la forma `leadsData[]` que espera el frontend
      const result = {
        empresa: (dataEmpresa as any)?.empresa || '',
        leads_publicidad,
        leads_dm,
      };

      return [result];
    } catch (error) {
      throw error;
    }
  }
}

const supabaseServiceInstance = new SupabaseService();
export default supabaseServiceInstance;
