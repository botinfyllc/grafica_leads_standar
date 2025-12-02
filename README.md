# Como configurar las graficas de leads

## Supabase

### Se debe agregar un registro en la tabla `empresas_dashboard` y guardar el id de la empresa para los siguientes pasos.

### Tambien tener en cuenta las siguientes tablas:

### `tipo_leads_dashboard` Aqui se definen los tipos de leads que se van a mostrar en las graficas.

### `red_social_dashboard` Aqui se definen las fuentes de los leads que se van a mostrar en las graficas.

## Botinfy

### Se debe agregar un trigger para nuevos usuarios y que envie el siguiente json

```json
{
"message": {{last_message :: $}},
"red_social": id_red_social,
"empresa": id_empresa
}
```

### El json del workflow esta adjunto en este repositorio, deben cambiar el webhook por el suyo.

## Backend

### No se debe tocar nada, ya que las graficas ya estan preparadas para recibir los datos.

## Frontend

### Se debe modificar en el `app/dashboard/page.tsx` en la llamada al hook de la grafica de leads el id de la empresa (el int que esta suelto, para este caso el 999999)

```tsx
const { fetchLeadsData: nombreFuncion, leadsData: nombreData } = useChartLeads(
  social,
  999999,
  range?.from,
  range?.to
);
```

## Se deben agregar los nombreFuncion a los `useEffect` para que se ejecuten al cargar la pagina.

```tsx
useEffect(() => {
  nombreFuncion();
}, [social, range]);
```

### Luego se debe modificar en el mismo archivo las llamadas al componente de la grafica de leads, cambiando el prop `chartData` por el nombre del data que se definio en el paso anterior.

```tsx
<BarChartLeads chartData={nombreData} />
```
