const App = () => {
    const [display, setDisplay] = React.useState('0');
    const [lastOperation, setLastOperation] = React.useState(null);
    const handleNumber = (value) => {
        setDisplay((prev) => {
            if (prev === '0') {
                return value;
            }
            return prev + value;
        });
    }
    const handleOperator = (value) => {
        setDisplay((prev) => {
          if (prev === '0') {
            return value;
          }
          const lastChar = prev.slice(-1);
          if (lastChar.match(/[+\-*/]/) && value.match(/[+\-*/]/) && value !== '-') {
            return prev.slice(0, -1) + value;
          } else if (value === '.') {
            const lastNumber = prev.split(/[+\-*/]/).pop();
            const nextChar = prev.slice(-1);
            if (!lastNumber.includes('.') && (nextChar.match(/[\d]/) || nextChar === '')) {
              return prev + value;
            }
            return prev;
          }
          return prev + value;
        });
      };
    const handleDeleteOne = () => {
        setDisplay((prev) => {
            if (prev === '0' || prev.length === 1) {
                return '0';
            }
            return prev.slice(0, -1);
        });
    }
    const handleDelete = () => {
        setLastOperation(null);
        setDisplay('0');
    }
    const handleEquals = () => {
        setDisplay((prev) => {
            let result;
            // Verificar si la expresión termina con un número
            if (!prev.match(/[+\-*/]$/)) {
              result = eval(prev);
              setLastOperation(prev + " =");
            } else {
              result = "Error";
            }
            return String(result);
          });
      };
    return (
        <div className="container">
            <div className="calculator">
                <div className="display-container">
                    <div id="display">
                        <div className="last-operation">{lastOperation}</div>
                        {display}
                    </div>
                </div>
                <div className="grid">
                    <div onClick={() => handleNumber('7')} className="padButton" id="seven">7</div>
                    <div onClick={() =>handleNumber('8')} className="padButton" id="eight">8</div>
                    <div onClick={() =>handleNumber('9')} className="padButton" id="nine">9</div>
                    <div onClick={handleDeleteOne} className="padButton" id="clear-one">C</div>
                    <div onClick={handleDelete} className="padButton" id="clear">AC</div>
                    <div onClick={() =>handleNumber('4')} className="padButton" id="four">4</div>
                    <div onClick={() =>handleNumber('5')} className="padButton" id="five">5</div>
                    <div onClick={() =>handleNumber('6')} className="padButton" id="six">6</div>
                    <div onClick={() => handleOperator('*')} className="padButton" id="multiply">x</div>
                    <div onClick={() => handleOperator('/')} className="padButton" id="divide">/</div>
                    <div onClick={() =>handleNumber('1')} className="padButton" id="one">1</div>
                    <div onClick={() =>handleNumber('2')} className="padButton" id="two">2</div>
                    <div onClick={() =>handleNumber('3')} className="padButton" id="three">3</div>
                    <div onClick={() => handleOperator('+')} className="padButton" id="add">+</div>
                    <div onClick={() => handleOperator('-')} className="padButton" id="subtract">-</div>
                    <div onClick={() =>handleNumber ('0')} className="padButton triple-width" id="zero">0</div>
                    <div onClick={() => handleOperator('.')} className="padButton" id="decimal">.</div>
                    <div onClick={handleEquals} className="padButton" id="equals">=</div>
                </div>
            </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
