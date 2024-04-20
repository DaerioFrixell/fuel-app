import { FC, useState } from "react";


export const App: FC = () => {
  const [counter, setCouter] = useState(0);

  const fn = () => {
    setCouter(counter + 1)
  }

  return (
    <div>
      count {counter}

      <button onClick={fn}>up</button>
    </div>
  )
}