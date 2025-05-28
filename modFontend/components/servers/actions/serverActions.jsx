//serverActions.jsx
import backend from "../backend";

export async function SignUp(formData) {
  const name = formData.get("name");
  const surname = formData.get("surname");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmationPassword = formData.get("confirmationPassword");

  const submitRegistration = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        surname: surname,
        email: email,
        hashed_password: password,
      }),
    };
    const response = await fetch(`${backend}/api/users`, requestOptions);
    const responseData = await response.json(); // Read the response body once

    if (!response.ok) {
      console.log(responseData);
      alert(JSON.stringify(responseData.detail));
    } else {
      // alert(responseData.name);
      if (typeof window !== 'undefined') { localStorage.setItem("casestudyuser", JSON.stringify(responseData)); }
      // global.Set("userData", JSON.parse(responseData));
    }
  };

  if (password === confirmationPassword && password.length > 5) {
    submitRegistration();
    // handleSignInClick()
  } else {
  }
}

export async function LogIn(formData) {
  const name = formData.get("name");
  const surname = formData.get("surname");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmationPassword = formData.get("confirmationPassword");
  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };

    const response = await fetch(`${backend}/api/login`, requestOptions);
    const responseData = await response.json(); // Read the response body once

    if (!response.ok) {
      alert(JSON.stringify(responseData.detail));
    } else {
      console.log(responseData);
      if (typeof window !== 'undefined') { localStorage.setItem("casestudyuser", JSON.stringify(responseData)); }
      getUserAccount();
      getNotifications();
      getUserLot(responseData)

      // alert(responseData.name);
      if (typeof window !== 'undefined') { window.location.href = "/main"; }
      // history.push("/main")
      // revalidatePath("/main") // Not sure where this is defined
    }
  };

  // e.preventDefault();
  if (password.length > 5) {
    submitLogin();
  } else {
  }
}

export async function getUser() {
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("casestudyuser")) : null;
  const requestOps = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: user?.email,
    }),
  };
  const uResp = await fetch(`${backend}/api/curr_user`, requestOps);
  const uRespData = await uResp.json();

  if (!uResp.ok) {
    alert("Error On The Server");
  } else {
    if (typeof window !== 'undefined') { localStorage.setItem("casestudyuser", JSON.stringify(uRespData)); }
    getUserAccount();
    getNotifications();
    getUserLot(uRespData)
  }
}

export async function getUserAccount() {
  let user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("casestudyuser")) : null;
  // console.log(user?.id);
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(
    `${backend}/api/my_account/?user_id=${user?.id}`,
    requestOptions
  );
  const responseData = await response.json();

  if (!response.ok) {
    // setErrorMessage(JSON.stringify(responseData.detail)); // setErrorMessage is not defined here
    console.error("Error fetching user account:", responseData.detail);
  } else {
    //   console.log(responseData);
    //   alert(responseData.name);
    if (typeof window !== 'undefined') { localStorage.setItem("useraccount", JSON.stringify(responseData)); }
  }
}

export async function getNotifications() {
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("casestudyuser")) : null;

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(`${backend}/api/notifications/${user?.id}`, requestOptions);
  const responseData = await response.json();
  if (typeof window !== 'undefined') { localStorage.setItem("usernotifications", JSON.stringify(responseData)); }
}

export async function reserveLot(hours, bookStat) {
  event.preventDefault();

  
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("casestudyuser")) : null;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userid: user?.id,
      hours,
      immediate_booking: bookStat,
    }),
  };

  const response = await fetch(`${backend}/api/book_parking`, requestOptions);

  

  if (!response.ok) {
    alert("Error Occured On The Server!");
  } else {
    getUser();
    // getUserAccount();
    // getNotifications();
    if (typeof window !== 'undefined') { window.location.href = "/main"; }
  }
}
  
export async function getUserLot(user) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    
  };

  const response = await fetch(`${backend}/api/my_parkinglot?userid=${user?.id}`, requestOptions);
  const responseData = await response.json();
  if (typeof window !== 'undefined') { localStorage.setItem("userLot", JSON.stringify(responseData)); }
}

export async function revokeLot() {
  event.preventDefault();

  
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("casestudyuser")) : null;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: user?.id,
    }),
  };

  const response = await fetch(`${backend}/api/revoke`, requestOptions);

  

  if (!response.ok) {
    alert(JSON.stringify(response.json));
  } else {
    getUser();
    // getUserAccount();
    // getNotifications();
    if (typeof window !== 'undefined') { window.location.href = "/main"; }
  }
}