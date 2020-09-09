import React, { useEffect, useState } from 'react';
import './App.css';
import getRandomUser from './api/Api';

function App() {
  const [user, setUser] = useState([]);
  const [wealth, setWealth] = useState();

  useEffect(() => {
    generateNewUser();
    generateNewUser();
    generateNewUser();
  }, []);

  const generateNewUser = async () => {
    const getUserName = await getRandomUser();

    const userInfo = {
      name: `${getUserName.name.first} ${getUserName.name.last}`,
      money: Math.floor(Math.random() * 1000000),
    };

    setUser((prevState) => [
      ...prevState,
      {
        name: userInfo.name,
        money: userInfo.money,
      },
    ]);
  };

  const formatMoney = function formatMoney(number) {
    return '$ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  const doubleMoney = () => {
    const userCopy = [...user];

    const updatedUser = userCopy.map((item) => {
      return { ...item, money: item.money * 2 };
    });
    setUser(updatedUser);
  };

  const sortByRich = () => {
    const userCopy = [...user];

    const updatedUser = userCopy.sort((a, b) => b.money - a.money);

    setUser(updatedUser);
  };

  const showMillionaires = () => {
    const userCopy = [...user];

    const updateUser = userCopy.filter((item) => item.money >= 1000000);

    setUser(updateUser);
  };

  const calculateWealth = () => {
    const wealth = user.reduce((acc, item) => (acc += item.money), 0);

    setWealth(wealth);
  };

  return (
    <div className='App'>
      <h1>Array Methods</h1>
      <div className='container'>
        <aside>
          <button id='add-user' onClick={generateNewUser}>
            Add User
          </button>
          <button id='double' onClick={doubleMoney}>
            Double Money
          </button>
          <button id='show-millionaires' onClick={showMillionaires}>
            Show Only Millionaires
          </button>
          <button id='sort' onClick={sortByRich}>
            Sort by Richest
          </button>
          <button id='calculate-wealth' onClick={calculateWealth}>
            Calculate Entire Wealth
          </button>
        </aside>
        <main id='main'>
          <h2>
            <strong>Person</strong>Wealth
          </h2>
          {user &&
            user.map((item, index) => (
              <div className='person' key={index}>
                <strong>{item.name} </strong>
                {formatMoney(item.money)}
              </div>
            ))}
          {wealth !== undefined && (
            <h3>
              Total Wealth: <strong>{formatMoney(wealth)}</strong>
            </h3>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
