import { useEffect, useState } from "react";
import "./App.css"

function App() {
  const [bill , setBill] = useState(0)
  const [tip , setTip] = useState(0)
  const [PeopleNumber, SetPeopleNumber]=useState(0)

  const [total , setTotal] = useState(0)
  const [TipAmount , setTipAmount] = useState(0)

  const [error , setError] = useState({
    bill :"",
    tip :"",
    number:""
  })


  const [focus , setFocus] = useState()
  const [resetStatus ,setStatus] = useState(false)
  useEffect(()=>{
    if(bill >0  && tip > 0 && PeopleNumber>0){
      setError({
        bill :"",
        tip :"",
        number:""
      })

      let tipPer = Number(tip) /100
      let totalTip = Number(bill) * tipPer
      let tempTotal = (Number( bill) + totalTip) / Number(PeopleNumber)
      let tempAmount = totalTip / Number(PeopleNumber)

      setTotal(tempTotal)
      setTipAmount(tempAmount)

      setStatus(true)
    } 
    else if (+bill === 0) {
      setError({
        bill :"can't be 0 ",
        tip :"",
        number:""
      })
    }
    else if (+tip === 0) {
      setError({
        bill :"",
        tip :"can't be 0",
        number:""
      }) 
    }
    else if (+PeopleNumber === 0) {
      setError({
        bill :"",
        tip :"",
        number:"can't be 0"
      }) 
    }

 },[PeopleNumber , bill , tip])


 const handleReset = ()=>{
   setBill(0)
   setTip(0)
   SetPeopleNumber(0)

   setTotal(0)
   setTipAmount(0)
 }

  return (
    <>
      <main className="mainWrapper">
        <div className="mainContainer">
          <div className="itemSection">
            <div className="BillSection">
              <div className="BillHeader">
                  Bill
              </div>
              {error.bill&&<span className="error"> {error.bill}</span>}
              <div className={focus==="bill" ? "inputContainer focus" : "inputContainer"}>
                <label htmlFor="bill">
                  <img src="./assets/icon-dollar.svg" alt="" />
                </label>
                <input type="number" id="bill" placeholder={0} value={bill} 
                onChange={(e)=>{setBill(e.target.value)}}
                onFocus={()=>{setFocus("bill")}}
                min="0" />
              </div>
            </div>

            <div className="TipSection">
              <div className="TipHeader">
                Select Tip %
              </div>
                <span className="error">{error.tip}</span>
              <div className="TipsContainer">
                <div className={ tip ==="5"? "Tip Active" : "Tip"} id="5" onClick={(e)=>setTip(e.target.id)}>5%</div>
                <div className={ tip ==="10"? "Tip Active" : "Tip"} id="10" onClick={(e)=>setTip(e.target.id)}>10%</div>
                <div className={ tip ==="15"? "Tip Active" : "Tip"} id="15" onClick={(e)=>setTip(e.target.id)}>15%</div>
                <div className={ tip ==="25"? "Tip Active" : "Tip"} id="25" onClick={(e)=>setTip(e.target.id)}>25%</div>
                <div className={ tip ==="50"? "Tip Active" : "Tip"} id="50" onClick={(e)=>setTip(e.target.id)}>50%</div>
                <div className="Tip custom" id="inuptValue">
                  <input type="number" placeholder="custom" min="1" max="100" 
                  onChange={(e)=>setTip(e.target.value)}/>
                </div>
              </div>
            </div>

            <div className="PeopleNumberSection">
              <div className="NumberHeader">
                Number of People
              </div>
              {error.number &&<span className="error">{error.number}</span>}
              <div className={focus==="number" ?  "focus inputContainer" : "inputContainer"}>
                <label htmlFor="number">
                  <img src="./assets/icon-person.svg" alt="people"/>
                </label>
                <input type="number"  id="number" min="0" placeholder="0" value={PeopleNumber}
                onChange={(e)=>{SetPeopleNumber(e.target.value)}}
                onFocus={()=>{setFocus("number")}}
                />
              </div>
            </div>
          </div>

          <div className="outputContainer">
            <div className="valuesContainer">
              <div className="Amount">
                <div className="leftAmount">
                  Tip Amount <p>
                    / person
                  </p>
                </div>
                <div className="rightAmount">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="17">
                    <path fill="#38bfb1"
                        d="M6.016 16.328v-1.464c1.232-.08 2.22-.444 2.964-1.092.744-.648 1.116-1.508 1.116-2.58v-.144c0-.992-.348-1.772-1.044-2.34-.696-.568-1.708-.932-3.036-1.092V4.184c.56.144 1.012.4 1.356.768.344.368.516.816.516 1.344v.288h1.824v-.432c0-.448-.088-.876-.264-1.284a3.783 3.783 0 00-.744-1.116A4.251 4.251 0 007.54 2.9a5.324 5.324 0 00-1.524-.492V.872H4.288V2.36a5.532 5.532 0 00-1.416.324c-.448.168-.84.392-1.176.672-.336.28-.604.616-.804 1.008-.2.392-.3.844-.3 1.356v.144c0 .96.316 1.708.948 2.244.632.536 1.548.884 2.748 1.044v3.912c-.704-.16-1.248-.472-1.632-.936-.384-.464-.576-1.08-.576-1.848v-.288H.256v.576c0 .464.08.924.24 1.38.16.456.404.88.732 1.272.328.392.744.728 1.248 1.008s1.108.476 1.812.588v1.512h1.728zM4.288 7.424c-.688-.128-1.164-.332-1.428-.612-.264-.28-.396-.644-.396-1.092 0-.464.176-.832.528-1.104.352-.272.784-.448 1.296-.528v3.336zm1.728 5.712V9.344c.768.128 1.328.328 1.68.6.352.272.528.688.528 1.248 0 .544-.196.984-.588 1.32-.392.336-.932.544-1.62.624z" />
                  </svg>
                 {TipAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                </div>
              </div>

              <div className="Amount">
                <div className="leftAmount">
                  Total <p>
                    / person
                  </p>
                </div>
                <div className="rightAmount">
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="17">
                    <path fill="#38bfb1"
                        d="M6.016 16.328v-1.464c1.232-.08 2.22-.444 2.964-1.092.744-.648 1.116-1.508 1.116-2.58v-.144c0-.992-.348-1.772-1.044-2.34-.696-.568-1.708-.932-3.036-1.092V4.184c.56.144 1.012.4 1.356.768.344.368.516.816.516 1.344v.288h1.824v-.432c0-.448-.088-.876-.264-1.284a3.783 3.783 0 00-.744-1.116A4.251 4.251 0 007.54 2.9a5.324 5.324 0 00-1.524-.492V.872H4.288V2.36a5.532 5.532 0 00-1.416.324c-.448.168-.84.392-1.176.672-.336.28-.604.616-.804 1.008-.2.392-.3.844-.3 1.356v.144c0 .96.316 1.708.948 2.244.632.536 1.548.884 2.748 1.044v3.912c-.704-.16-1.248-.472-1.632-.936-.384-.464-.576-1.08-.576-1.848v-.288H.256v.576c0 .464.08.924.24 1.38.16.456.404.88.732 1.272.328.392.744.728 1.248 1.008s1.108.476 1.812.588v1.512h1.728zM4.288 7.424c-.688-.128-1.164-.332-1.428-.612-.264-.28-.396-.644-.396-1.092 0-.464.176-.832.528-1.104.352-.272.784-.448 1.296-.528v3.336zm1.728 5.712V9.344c.768.128 1.328.328 1.68.6.352.272.528.688.528 1.248 0 .544-.196.984-.588 1.32-.392.336-.932.544-1.62.624z" />
                  </svg>
                  {total.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                </div>
              </div>
            </div>

              <div className="Reset">
                <button className={!resetStatus ? "btn disable" : "btn"}
                onClick={handleReset}
                >
                  RESET
                </button>
            </div>
          </div>
        </div>
      </main>
    
    </>
  );
}

export default App;
