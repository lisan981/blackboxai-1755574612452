import { useState, useEffect } from 'react';

// Componente para los botones de navegación
const NavButton = ({ text, onClick, currentView, target }) => (
  <button
    onClick={onClick}
    className={`
      px-3 py-2 rounded-full font-semibold transition-all duration-300 shadow-md text-sm
      ${currentView === target
        ? 'bg-green-600 text-white scale-105'
        : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-green-600 hover:text-white'}
    `}
  >
    {text}
  </button>
);

// Componente para mostrar las métricas financieras
const StatCard = ({ title, value, isProfit, color }) => (
  <div className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors duration-300 ${color || ''}`}>
    <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</h3>
    <p className={`text-3xl font-bold ${isProfit === undefined ? 'text-green-600' : (isProfit ? 'text-green-500' : 'text-red-500')}`}>
      Bs {value.toFixed(2)}
    </p>
  </div>
);

// Componente principal de la aplicación
const App = () => {
  // Estado para la navegación y la visualización de la app
  const [view, setView] = useState('login');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [theme, setTheme] = useState('light');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Estado para los datos financieros
  const [capitalInicial, setCapitalInicial] = useState(10000);
  const [efectivo, setEfectivo] = useState(15000);
  const [valorInventario, setValorInventario] = useState(25000);
  const [valorMateriales, setValorMateriales] = useState(8000);
  const [totalPorCobrar, setTotalPorCobrar] = useState(5000);
  const [totalGastos, setTotalGastos] = useState(3000);
  const [totalVentasIngresos, setTotalVentasIngresos] = useState(45000);
  const [totalCostosDeVenta, setTotalCostosDeVenta] = useState(20000);

  // Estado para las listas de productos, materiales y deudas
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Te Paris', cantidad: 50, precio: 15, costo: 10 },
    { id: 2, nombre: 'Galletas', cantidad: 30, precio: 8, costo: 5 },
    { id: 3, nombre: 'Arroz 3/4', cantidad: 20, precio: 25, costo: 18 }
  ]);
  const [materiales, setMateriales] = useState([
    { id: 1, nombre: 'Bolsas plásticas', cantidad: 100, precio: 0.5 },
    { id: 2, nombre: 'Etiquetas', cantidad: 200, precio: 0.2 }
  ]);
  const [deudas, setDeudas] = useState([
    { id: 1, deudor: 'Juan Pérez', monto: 150, fecha: '2024-01-15', tipo: 'credito' },
    { id: 2, deudor: 'María García', monto: 200, fecha: '2024-01-20', tipo: 'credito' }
  ]);
  const [ventas, setVentas] = useState([
    { id: 1, productos: [{ nombre: 'Te Paris', cantidad: 2, precio: 15 }], total: 30, tipo: 'efectivo', fecha: '2024-01-25' }
  ]);
  const [gastos, setGastos] = useState([
    { id: 1, descripcion: 'Electricidad', monto: 150, fecha: '2024-01-10' },
    { id: 2, descripcion: 'Alquiler', monto: 800, fecha: '2024-01-01' }
  ]);
  const [inyeccionesCapital, setInyeccionesCapital] = useState([
    { id: 1, monto: 5000, fecha: '2024-01-01', descripcion: 'Capital inicial adicional' }
  ]);

  // Lista base de productos para los desplegables
  const productosBase = [
    'Te Paris', 'Galletas', 'Cereales', 'Arroz 3/4', 'Fideo Famosa',
    'Azúcar blanca', 'Harina Pampa blanca', 'Lavandina', 'Jaboncillo',
    'Ace brillo', 'Mantequilla', 'Mermelada', 'Sal', 'Sardina',
    'Picadillo', 'Shampoo', 'Harry el limonero', 'Salsa soja',
    'Vinagre', 'Doña gusta'
  ];

  // Componente Dashboard
  const Dashboard = () => {
    const totalActivos = efectivo + valorInventario + valorMateriales + totalPorCobrar;
    const valorNeto = capitalInicial + (totalVentasIngresos - totalCostosDeVenta - totalGastos);
    const resultadoDelPeriodo = totalVentasIngresos - totalCostosDeVenta - totalGastos;

    return (
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Dashboard Financiero</h2>
          <p className="text-gray-600 dark:text-gray-400">Resumen de las métricas financieras principales</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Efectivo (Bs)" value={efectivo} />
          <StatCard title="Activos Totales (Bs)" value={totalActivos} />
          <StatCard title="Total por Cobrar (Bs)" value={totalPorCobrar} />
          <StatCard title="Valor Inventario (Bs)" value={valorInventario + valorMateriales} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Resultado del Período" value={resultadoDelPeriodo} isProfit={resultadoDelPeriodo > 0} />
          <StatCard title="Valor Neto (Bs)" value={valorNeto} />
          <StatCard title="Total Gastos (Bs)" value={totalGastos} isProfit={false} />
        </div>
      </div>
    );
  };

  // Componente Inventario
  const Inventario = () => {
    const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', cantidad: '', precio: '', costo: '' });

    const agregarProducto = () => {
      if (nuevoProducto.nombre && nuevoProducto.cantidad && nuevoProducto.precio && nuevoProducto.costo) {
        const producto = {
          id: Date.now(),
          nombre: nuevoProducto.nombre,
          cantidad: parseInt(nuevoProducto.cantidad),
          precio: parseFloat(nuevoProducto.precio),
          costo: parseFloat(nuevoProducto.costo)
        };
        setProductos([...productos, producto]);
        setNuevoProducto({ nombre: '', cantidad: '', precio: '', costo: '' });
        setMessage('Producto agregado exitosamente');
        setTimeout(() => setMessage(''), 3000);
      }
    };

    const eliminarProducto = (id) => {
      setProductos(productos.filter(p => p.id !== id));
      setMessage('Producto eliminado');
      setTimeout(() => setMessage(''), 3000);
    };

    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Gestión de Inventario</h2>
        
        {/* Formulario para agregar producto */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Agregar Nuevo Producto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <select
              value={nuevoProducto.nombre}
              onChange={(e) => setNuevoProducto({...nuevoProducto, nombre: e.target.value})}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Seleccionar producto</option>
              {productosBase.map(prod => (
                <option key={prod} value={prod}>{prod}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Cantidad"
              value={nuevoProducto.cantidad}
              onChange={(e) => setNuevoProducto({...nuevoProducto, cantidad: e.target.value})}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Precio de venta"
              value={nuevoProducto.precio}
              onChange={(e) => setNuevoProducto({...nuevoProducto, precio: e.target.value})}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Costo"
              value={nuevoProducto.costo}
              onChange={(e) => setNuevoProducto({...nuevoProducto, costo: e.target.value})}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <button
            onClick={agregarProducto}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Agregar Producto
          </button>
        </div>

        {/* Lista de productos */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Producto</th>
                  <th className="px-4 py-3 text-left">Cantidad</th>
                  <th className="px-4 py-3 text-left">Precio</th>
                  <th className="px-4 py-3 text-left">Costo</th>
                  <th className="px-4 py-3 text-left">Valor Total</th>
                  <th className="px-4 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(producto => (
                  <tr key={producto.id} className="border-b dark:border-gray-600">
                    <td className="px-4 py-3">{producto.nombre}</td>
                    <td className="px-4 py-3">{producto.cantidad}</td>
                    <td className="px-4 py-3">Bs {producto.precio}</td>
                    <td className="px-4 py-3">Bs {producto.costo}</td>
                    <td className="px-4 py-3">Bs {(producto.cantidad * producto.costo).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => eliminarProducto(producto.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Componente Ventas
  const Ventas = () => {
    const [nuevaVenta, setNuevaVenta] = useState({
      productos: [{ nombre: '', cantidad: '', precio: '' }],
      tipo: 'efectivo',
      deudor: ''
    });

    const agregarProductoVenta = () => {
      setNuevaVenta({
        ...nuevaVenta,
        productos: [...nuevaVenta.productos, { nombre: '', cantidad: '', precio: '' }]
      });
    };

    const actualizarProductoVenta = (index, campo, valor) => {
      const productosActualizados = [...nuevaVenta.productos];
      productosActualizados[index][campo] = valor;
      setNuevaVenta({ ...nuevaVenta, productos: productosActualizados });
    };

    const registrarVenta = () => {
      const productosValidos = nuevaVenta.productos.filter(p => p.nombre && p.cantidad && p.precio);
      if (productosValidos.length > 0) {
        const total = productosValidos.reduce((sum, p) => sum + (parseFloat(p.cantidad) * parseFloat(p.precio)), 0);
        const venta = {
          id: Date.now(),
          productos: productosValidos,
          total,
          tipo: nuevaVenta.tipo,
          deudor: nuevaVenta.tipo === 'credito' ? nuevaVenta.deudor : '',
          fecha: new Date().toISOString().split('T')[0]
        };
        
        setVentas([...ventas, venta]);
        
        if (nuevaVenta.tipo === 'credito' && nuevaVenta.deudor) {
          const nuevaDeuda = {
            id: Date.now() + 1,
            deudor: nuevaVenta.deudor,
            monto: total,
            fecha: new Date().toISOString().split('T')[0],
            tipo: 'credito'
          };
          setDeudas([...deudas, nuevaDeuda]);
        }
        
        setNuevaVenta({
          productos: [{ nombre: '', cantidad: '', precio: '' }],
          tipo: 'efectivo',
          deudor: ''
        });
        setMessage('Venta registrada exitosamente');
        setTimeout(() => setMessage(''), 3000);
      }
    };

    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Registro de Ventas</h2>
        
        {/* Formulario de venta */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Nueva Venta</h3>
          
          {/* Productos de la venta */}
          {nuevaVenta.productos.map((producto, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <select
                value={producto.nombre}
                onChange={(e) => actualizarProductoVenta(index, 'nombre', e.target.value)}
                className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">Seleccionar producto</option>
                {productosBase.map(prod => (
                  <option key={prod} value={prod}>{prod}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Cantidad"
                value={producto.cantidad}
                onChange={(e) => actualizarProductoVenta(index, 'cantidad', e.target.value)}
                className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Precio unitario"
                value={producto.precio}
                onChange={(e) => actualizarProductoVenta(index, 'precio', e.target.value)}
                className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          ))}
          
          <button
            onClick={agregarProductoVenta}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Agregar Producto
          </button>
          
          {/* Tipo de venta */}
          <div className="mb-4">
            <label className="block mb-2">Tipo de venta:</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="efectivo"
                  checked={nuevaVenta.tipo === 'efectivo'}
                  onChange={(e) => setNuevaVenta({...nuevaVenta, tipo: e.target.value})}
                  className="mr-2"
                />
                Efectivo
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="credito"
                  checked={nuevaVenta.tipo === 'credito'}
                  onChange={(e) => setNuevaVenta({...nuevaVenta, tipo: e.target.value})}
                  className="mr-2"
                />
                Crédito
              </label>
            </div>
          </div>
          
          {/* Campo deudor si es crédito */}
          {nuevaVenta.tipo === 'credito' && (
            <input
              type="text"
              placeholder="Nombre del deudor"
              value={nuevaVenta.deudor}
              onChange={(e) => setNuevaVenta({...nuevaVenta, deudor: e.target.value})}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 mb-4"
            />
          )}
          
          <button
            onClick={registrarVenta}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Registrar Venta
          </button>
        </div>

        {/* Lista de ventas */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <h3 className="text-lg font-semibold p-4 border-b dark:border-gray-600">Historial de Ventas</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Fecha</th>
                  <th className="px-4 py-3 text-left">Productos</th>
                  <th className="px-4 py-3 text-left">Total</th>
                  <th className="px-4 py-3 text-left">Tipo</th>
                  <th className="px-4 py-3 text-left">Deudor</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map(venta => (
                  <tr key={venta.id} className="border-b dark:border-gray-600">
                    <td className="px-4 py-3">{venta.fecha}</td>
                    <td className="px-4 py-3">
                      {venta.productos.map((p, i) => (
                        <div key={i}>{p.nombre} x{p.cantidad}</div>
                      ))}
                    </td>
                    <td className="px-4 py-3">Bs {venta.total.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        venta.tipo === 'efectivo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {venta.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-3">{venta.deudor || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Componente Deudas
  const Deudas = () => {
    const [pagoDeuda, setPagoDeuda] = useState({ deudaId: '', monto: '' });

    const pagarDeuda = () => {
      if (pagoDeuda.deudaId && pagoDeuda.monto) {
        const deuda = deudas.find(d => d.id === parseInt(pagoDeuda.deudaId));
        const montoPago = parseFloat(pagoDeuda.monto);
        
        if (deuda && montoPago <= deuda.monto) {
          if (montoPago === deuda.monto) {
            // Pago completo - eliminar deuda
            setDeudas(deudas.filter(d => d.id !== parseInt(pagoDeuda.deudaId)));
          } else {
            // Pago parcial - actualizar monto
            setDeudas(deudas.map(d => 
              d.id === parseInt(pagoDeuda.deudaId) 
                ? { ...d, monto: d.monto - montoPago }
                : d
            ));
          }
          setPagoDeuda({ deudaId: '', monto: '' });
          setMessage('Pago registrado exitosamente');
          setTimeout(() => setMessage(''), 3000);
        }
      }
    };

    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Gestión de Deudas</h2>
        
        {/* Formulario de pago */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Registrar Pago</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={pagoDeuda.deudaId}
              onChange={(e) => setPagoDeuda({...pagoDeuda, deudaId: e.target.value})}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Seleccionar deuda</option>
              {deudas.map(deuda => (
                <option key={deuda.id} value={deuda.id}>
                  {deuda.deudor} - Bs {deuda.monto}
                </option>
              ))}
            </select>
            <input
              type="number"
              step="0.01"
              placeholder="Monto del pago"
              value={pagoDeuda.monto}
              onChange={(e) => setPagoDeuda({...pagoDeuda, monto: e.target.value})}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <button
            onClick={pagarDeuda}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Registrar Pago
          </button>
        </div>

        {/* Lista de deudas */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <h3 className="text-lg font-semibold p-4 border-b dark:border-gray-600">Deudas Pendientes</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Deudor</th>
                  <th className="px-4 py-3 text-left">Monto</th>
                  <th className="px-4 py-3 text-left">Fecha</th>
                  <th className="px-4 py-3 text-left">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {deudas.map(deuda => (
                  <tr key={deuda.id} className="border-b dark:border-gray-600">
                    <td className="px-4 py-3">{deuda.deudor}</td>
                    <td className="px-4 py-3">Bs {deuda.monto.toFixed(2)}</td>
                    <td className="px-4 py-3">{deuda.fecha}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-800">
                        {deuda.tipo}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Componente Gastos
  const Gastos = () => {
    const [nuevoGasto, setNuevoGasto] = useState({ descripcion: '', monto: '', fecha: '' });

    const agregarGasto = () => {
      if (nuevoGasto.descripcion && nuevoGasto.monto && nuevoGasto.fecha) {
        const gasto = {
          id: Date.now(),
          descripcion: nuevoGasto.descripcion,
          monto: parseFloat(nuevoGasto.monto),
          fecha: nuevoGasto.fecha
        };
        setGastos([...gastos, gasto]);
        setNuevoGasto({ descripcion: '', monto: '', fecha: '' });
        setMessage('Gasto registrado exitosamente');
        setTimeout(() => setMessage(''), 3000);
      }
    };

    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Registro de Gastos</h2>
        
        {/* Formulario de gasto */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Nuevo Gasto</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Descripción del gasto"
              value={nuevoGasto.descripcion}
              onChange={(e) => setNuevoGasto({...nuevoGasto, descripcion: e.target.value})}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Monto"
              value={nuevoGasto.monto}
              onChange={(e) => setNuevoGasto({...nuevoGasto, monto: e.target.value})}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="date"
              value={nuevoGasto.fecha}
              onChange={(e) => setNuevoGasto({...nuevoGasto, fecha: e.target.value})}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <button
            onClick={agregarGasto}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Registrar Gasto
          </button>
        </div>

        {/* Lista de gastos */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <h3 className="text-lg font-semibold p-4 border-b dark:border-gray-600">Historial de Gastos</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Fecha</th>
                  <th className="px-4 py-3 text-left">Descripción</th>
                  <th className="px-4 py-3 text-left">Monto</th>
                </tr>
              </thead>
              <tbody>
                {gastos.map(gasto => (
                  <tr key={gasto.id} className="border-b dark:border-gray-600">
                    <td className="px-4 py-3">{gasto.fecha}</td>
                    <td className="px-4 py-3">{gasto.descripcion}</td>
                    <td className="px-4 py-3">Bs {gasto.monto.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Componente Materiales
  const Materiales = () => {
    const [nuevoMaterial, setNuevoMaterial] = useState({ nombre: '', cantidad: '', precio: '' });

    const agregarMaterial = () => {
      if (nuevoMaterial.nombre && nuevoMaterial.cantidad && nuevoMaterial.precio) {
        const material = {
          id: Date.now(),
          nombre: nuevoMaterial.nombre,
          cantidad: parseInt(nuevoMaterial.cantidad),
          precio: parseFloat(nuevoMaterial.precio)
        };
        setMateriales([...materiales, material]);
        setNuevoMaterial({ nombre: '', cantidad: '', precio: '' });
        setMessage
('Material agregado exitosamente');
        setTimeout(() => setMessage(''), 3000);
      }
    };

    const eliminarMaterial = (id) => {
      setMateriales(materiales.filter(m => m.id !== id));
      setMessage('Material eliminado');
      setTimeout(() => setMessage(''), 3000);
    };

    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Gestión de Materiales</h2>
        
        {/* Formulario para agregar material */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Agregar Nuevo Material</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nombre del material"
              value={nuevoMaterial.nombre}
              onChange={(e) => setNuevoMaterial({...nuevoMaterial, nombre: e.target.value})}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={nuevoMaterial.cantidad}
              onChange={(e) => setNuevoMaterial({...nuevoMaterial, cantidad: e.target.value})}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Precio unitario"
              value={nuevoMaterial.precio}
              onChange={(e) => setNuevoMaterial({...nuevoMaterial, precio: e.target.value})}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <button
            onClick={agregarMaterial}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Agregar Material
          </button>
        </div>

        {/* Lista de materiales */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Material</th>
                  <th className="px-4 py-3 text-left">Cantidad</th>
                  <th className="px-4 py-3 text-left">Precio Unitario</th>
                  <th className="px-4 py-3 text-left">Valor Total</th>
                  <th className="px-4 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {materiales.map(material => (
                  <tr key={material.id} className="border-b dark:border-gray-600">
                    <td className="px-4 py-3">{material.nombre}</td>
                    <td className="px-4 py-3">{material.cantidad}</td>
                    <td className="px-4 py-3">Bs {material.precio}</td>
                    <td className="px-4 py-3">Bs {(material.cantidad * material.precio).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => eliminarMaterial(material.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Componente Capital
  const Capital = () => {
    const [nuevaInyeccion, setNuevaInyeccion] = useState({ monto: '', fecha: '', descripcion: '' });

    const agregarInyeccion = () => {
      if (nuevaInyeccion.monto && nuevaInyeccion.fecha && nuevaInyeccion.descripcion) {
        const inyeccion = {
          id: Date.now(),
          monto: parseFloat(nuevaInyeccion.monto),
          fecha: nuevaInyeccion.fecha,
          descripcion: nuevaInyeccion.descripcion
        };
        setInyeccionesCapital([...inyeccionesCapital, inyeccion]);
        setNuevaInyeccion({ monto: '', fecha: '', descripcion: '' });
        setMessage('Inyección de capital registrada exitosamente');
        setTimeout(() => setMessage(''), 3000);
      }
    };

    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Gestión de Capital</h2>
        
        {/* Formulario para inyección de capital */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Nueva Inyección de Capital</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              step="0.01"
              placeholder="Monto"
              value={nuevaInyeccion.monto}
              onChange={(e) => setNuevaInyeccion({...nuevaInyeccion, monto: e.target.value})}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="date"
              value={nuevaInyeccion.fecha}
              onChange={(e) => setNuevaInyeccion({...nuevaInyeccion, fecha: e.target.value})}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="text"
              placeholder="Descripción"
              value={nuevaInyeccion.descripcion}
              onChange={(e) => setNuevaInyeccion({...nuevaInyeccion, descripcion: e.target.value})}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <button
            onClick={agregarInyeccion}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Registrar Inyección
          </button>
        </div>

        {/* Resumen de capital */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <StatCard title="Capital Inicial" value={capitalInicial} />
          <StatCard title="Total Inyecciones" value={inyeccionesCapital.reduce((sum, i) => sum + i.monto, 0)} />
        </div>

        {/* Lista de inyecciones */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <h3 className="text-lg font-semibold p-4 border-b dark:border-gray-600">Historial de Inyecciones</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Fecha</th>
                  <th className="px-4 py-3 text-left">Monto</th>
                  <th className="px-4 py-3 text-left">Descripción</th>
                </tr>
              </thead>
              <tbody>
                {inyeccionesCapital.map(inyeccion => (
                  <tr key={inyeccion.id} className="border-b dark:border-gray-600">
                    <td className="px-4 py-3">{inyeccion.fecha}</td>
                    <td className="px-4 py-3">Bs {inyeccion.monto.toFixed(2)}</td>
                    <td className="px-4 py-3">{inyeccion.descripcion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Componente Configuración
  const Configuracion = () => (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Configuración de Firebase</h2>
      <div className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">📋 Instrucciones de Configuración</h3>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Para usar la aplicación con Firebase real, sigue estos pasos:
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">1. Crear proyecto en Firebase</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Ve a <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Firebase Console</a> y crea un nuevo proyecto.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">2. Configurar Authentication</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Habilita "Anonymous Authentication" en la sección Authentication.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">3. Configurar Firestore</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Crea una base de datos Firestore en modo de prueba.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">4. Obtener credenciales</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
              Copia las credenciales y actualiza el archivo .env:
            </p>
            <div className="bg-gray-800 text-green-400 p-3 rounded text-xs font-mono overflow-x-auto">
              <div>REACT_APP_FIREBASE_API_KEY=tu_api_key</div>
              <div>REACT_APP_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com</div>
              <div>REACT_APP_FIREBASE_PROJECT_ID=tu_proyecto_id</div>
              <div>REACT_APP_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com</div>
              <div>REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789</div>
              <div>REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef</div>
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <button
            onClick={() => setView('dashboard')}
            className="w-full bg-green-600 text-white p-3 rounded-lg shadow-md hover:bg-green-700 transition-colors"
          >
            Continuar con Demo
          </button>
        </div>
      </div>
    </div>
  );

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogin = async () => {
    setLoading(true);
    // Simular login
    setTimeout(() => {
      setIsLoggedIn(true);
      setView('dashboard');
      setMessage('¡Bienvenido al modo demo!');
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('login');
    setMessage('Sesión cerrada.');
  };

  const renderView = () => {
    if (view === 'login') {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-sm text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-4xl font-bold">MHA</span>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Ministerio Heme Aquí</h1>
            <p className="mb-6 text-gray-600 dark:text-gray-400">Sistema de Gestión Financiera</p>
            <button
              onClick={handleLogin}
              className="w-full bg-green-600 text-white p-3 rounded-lg shadow-md hover:bg-green-700 transition-colors"
              disabled={loading}
            >
              {loading ? 'Ingresando...' : 'Iniciar Demo'}
            </button>
            {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
            <div className="mt-4 text-xs text-gray-500">
              Versión Demo - Para producción configure Firebase
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`min-h-screen transition-colors duration-300 ${theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-gray-900 text-gray-100'}`}>
        <div className="container mx-auto p-4 sm:p-8">
          <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-lg font-bold">MHA</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-green-600">Ministerio Heme Aquí</h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="hidden md:block bg-white dark:bg-gray-800 p-2 rounded-lg text-sm shadow">
                <span className="font-semibold">Modo:</span> Demo
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-shadow"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white p-2 rounded-lg shadow-md hover:bg-red-700 transition-colors"
              >
                Salir
              </button>
            </div>
          </header>
          
          <div className="flex flex-wrap gap-2 mb-8 justify-center sm:justify-start">
            <NavButton text="Dashboard" onClick={() => setView('dashboard')} currentView={view} target="dashboard" />
            <NavButton text="Inventario" onClick={() => setView('inventario')} currentView={view} target="inventario" />
            <NavButton text="Ventas" onClick={() => setView('ventas')} currentView={view} target="ventas" />
            <NavButton text="Deudas" onClick={() => setView('deudas')} currentView={view} target="deudas" />
            <NavButton text="Gastos" onClick={() => setView('gastos')} currentView={view} target="gastos" />
            <NavButton text="Materiales" onClick={() => setView('materiales')} currentView={view} target="materiales" />
            <NavButton text="Capital" onClick={() => setView('capital')} currentView={view} target="capital" />
            <NavButton text="Configuración" onClick={() => setView('configuracion')} currentView={view} target="configuracion" />
          </div>
          
          {message && (
            <div className="p-3 mb-4 rounded-lg bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200 shadow-md">
              {message}
            </div>
          )}
          
          {view === 'dashboard' && <Dashboard />}
          {view === 'inventario' && <Inventario />}
          {view === 'ventas' && <Ventas />}
          {view === 'deudas' && <Deudas />}
          {view === 'gastos' && <Gastos />}
          {view === 'materiales' && <Materiales />}
          {view === 'capital' && <Capital />}
          {view === 'configuracion' && <Configuracion />}
        </div>
      </div>
    );
  };
  
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      {renderView()}
    </div>
  );
};

export default App;
