export default async function Api() {
    const data = await fetch('https://app-todo-list.fly.dev/');
    const res = await data.json();

    function renderJson(value: any): JSX.Element {
    if (value === null) {
      return <span className="text-gray-400">null</span>;
    } else if (Array.isArray(value)) {
      return (
        <span>
          [
          {value.map((v, i) => (
            <span key={i}>
              {renderJson(v)}
              {i < value.length - 1 ? ', ' : ''}
            </span>
          ))}
          ]
        </span>
      );
    } else if (typeof value === 'object') {
      return (
        <span>
          {'{'}
          {Object.entries(value).map(([k, v], i, arr) => (
            <div key={k} className="pl-4">
              <span className="text-yellow-400">"{k}"</span>: {renderJson(v)}
              {i < arr.length - 1 ? ',' : ''}
            </div>
          ))}
          {'}'}
        </span>
      );
    } else if (typeof value === 'string') {
      return <span className="text-green-400">"{value}"</span>;
    } else if (typeof value === 'number') {
      return <span className="text-blue-400">{value}</span>;
    } else if (typeof value === 'boolean') {
      return <span className="text-purple-400">{value.toString()}</span>;
    } else {
      return <span>{value}</span>;
    }
  }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full max-w-3xl bg-gray-900 text-white rounded-lg p-4 overflow-x-auto">
                <pre className="whitespace-pre-wrap">{renderJson(res)}</pre>
            </div>
            
            <a className="underline text-lg" href="/">Home</a>
        </main>
    )
}
