import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { testApi } from "../features/Slice";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
function Auth() {
  const [key, setKey] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthKey, statusCode } = useSelector((state) => state.weather_app);
  const api_key = JSON.parse(sessionStorage.getItem("api_key"));

  useEffect(() => {
    if (api_key != null) {
      navigate("/weather");
    }
  }, [isAuthKey, api_key, navigate]);

  useEffect(() => {
    if (statusCode !== 200 && statusCode !== 0) {
      toast.error("please enter a valid api key");
    }
  }, [statusCode]);

  return (
    <div>
      <ToastContainer />
      <div className='form-wrapper'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(testApi(key));
          }}
        >
          <input
            onChange={(e) => {
              setKey(e.target.value.trim());
            }}
            className='form-input'
            placeholder='enter your api key'
            type='text'
          />
          <button className='form-button'>enter</button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
