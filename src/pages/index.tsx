import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  decremented,
  incremented,
  amountAdded,
} from "../features/counter/counterSlice";
import Image from "next/image";
import { useFetchBreedsQuery } from "../features/dogs/dogs-api-slice";
import { useState } from "react";

export default function Home() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [numDogs, setNumDogs] = useState(5);
  const { data = [], isFetching } = useFetchBreedsQuery(numDogs);
  function handleIncrement() {
    dispatch(amountAdded(2));
  }

  function handleDecrement() {
    dispatch(decremented());
  }

  return (
    <div>
      <p>Counter: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>

      <div>
        <p>Number of dogs fetched: {data.length}</p>
        <div>
          <p>Number of dogs to fetch</p>
          <select
            value={numDogs}
            onChange={(e) => setNumDogs(Number(e.target.value))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {data.map((breed) => (
                <tr key={breed.id}>
                  <td>{breed.name}</td>
                  <td>
                    <Image
                      src={breed.image.url}
                      alt={breed.name}
                      width={200}
                      height={200}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
