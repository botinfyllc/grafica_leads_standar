import { Request, Response } from 'express';
import supabaseServiceInstance from '../services/supabase.service';

class DashboardController {
  public async getLeadsPorDia(req: Request, res: Response): Promise<Response> {
    let { red_social, first_day, last_day, empresa_id } = req.query;

    const leads = await supabaseServiceInstance.getLeadsPorDia(
      Number(red_social),
      Number(empresa_id),
      String(first_day),
      String(last_day)
    );
    return res.status(200).json(leads);
  }
}

const dashboardController = new DashboardController();
export default dashboardController;
