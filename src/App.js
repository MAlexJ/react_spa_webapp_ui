import "./App.css";
import "./index.css";
import UserPage from "./component/UserPage";
import {useEffect, useState} from "react";

function App() {

  const [telegramWebApp, setTelegramWebApp] = useState(null);
  const [user, setUser] = useState(null);
  const [tgInitDataUnsafe, setTgInitDataUnsafe] = useState(null);
  const [tgInitData, setTgInitData] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    setTelegramWebApp(window.Telegram);
    if (tg) {
      // Initialize Telegram Web App API
      setUser(tg.initData?.user || tg.initDataUnsafe?.user || null);
      setTgInitData(tg.initData || null);
      setTgInitDataUnsafe(tg.initDataUnsafe || null);
      setTheme(tg.colorScheme);

      // Show the main button
      tg.MainButton.text = "Send Data";
      tg.MainButton.show();

      // Handle main button click
      tg.MainButton.onClick(() => {
        tg.sendData("Hello from React!");
      });

      // Cleanup
      return () => {
        tg.MainButton.offClick();
      };
    } else {
      console.warn(
          "Telegram Web App API is not available. Running outside Telegram.");
    }
  }, []);

  return (<div
      // Use theme to conditionally style the app
      className={`App ${theme === "dark" ? "dark-theme" : "light-theme"}`}
  >
    <div>
      <div>
        telegramWebApp: {JSON.stringify(telegramWebApp, null, 1)}
      </div>
      <h1>Telegram Web App</h1>
      {user ? (<p>
        Hello, {user.first_name} {user.last_name || ""}!
      </p>) : (<p>
        Running locally. Open this app inside Telegram for full
        functionality.
      </p>)} <br/>
      <br/>
      <p>
        tg init data: {JSON.stringify(tgInitData, null, 1)}
      </p>
      <br/>
      <p>
        Unsafe tg init data: {JSON.stringify(tgInitDataUnsafe, null, 1)}
      </p>
      <br/>
    </div>
    <UserPage/>
  </div>);
}

export default App;
