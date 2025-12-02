# Como configurar las graficas de leads

## Para el backend no se debe tocar nada, ya que las graficas ya estan preparadas para recibir los datos.

## En el frontend se debe modificar en el `app/dashboard/page.tsx` en la llamada al hook de la grafica de leads el id de la empresa (el int que esta suelto, para este caso el 999999)

```tsx
const { fetchLeadsData: nombreFuncion, leadsData: nombreData } = useChartLeads(
  social,
  999999,
  range?.from,
  range?.to
);
```
