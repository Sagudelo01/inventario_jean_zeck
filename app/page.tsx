import { supabase } from "../conexionSupaBase/supabase";
// import { tableInventario } from "../components/tableInventario";

export default async function Page() {
  const { data: insumos, error } = await supabase.from("insumos").select("*");
  console.log("Respuesta:", insumos, "Error:", error);

  return (
    <div>
      <h1>Inventario de Insumos</h1>
      <ul>
        {insumos?.map((item) => (
          <li key={item.id}>
            {item.nombre} - Cantidad: {item.stock_actual}
          </li>
        ))}
      </ul>
    </div>
  );
}
