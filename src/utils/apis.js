import axios from 'axios';
// https://intechsol-developer.co/life-style-smoothie/api/register
// new link

const API = axios.create({
  // baseURL: 'https://intechsol-developer.co/life-style-smoothie',
  baseURL: 'https://lifestylesmoothie.com',
});

const userLogin = async payload => {
  const requrest = `/api/login`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};
const userRegister = async payload => {
  const requrest = `/api/register`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};
const HomeProducts = async payload => {
  const requrest = `/api/products`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};
const deleteUser = async payload => {
  const requrest = `/api/delete-user`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const Wishlist = async payload => {
  const requrest = `/api/wish-list`;
  try {
    const response = await API.post(requrest, payload.userdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.userToken}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};
const AboutUs = async payload => {
  const requrest = `/api/aboutUs`;
  try {
    const response = await API.get(requrest);
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    console.log('about us error', err);
  }
};

const FavoritItemsList = async payload => {
  const requrest = `/api/wish-list`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    console.log('Featured list', err);
  }
};

const Orderlist = async payload => {
  // console.log('payload', payload);
  const requrest = `/api/order-list`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    console.log('Orders list', err);
  }
};
const Editprofile = async payload => {
  const requrest = `/api/update-profile`;
  try {
    const response = await API.post(requrest, payload.userdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.userToken}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    console.log('in catch  edit profile', err);
  }
};

const ResetPassword = async payload => {
  const requrest = `/api/password-reset`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    console.log('Err', err.response);
  }
};

const Forgetpass = async payload => {
  console.log('payload', payload);
  const requrest = `/api/forgot-password`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};
const Codeconfirmation = async payload => {
  const requrest = `/api/verify-otp`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {}
};
const Changepassword = async payload => {
  const requrest = `/api/change-password`;
  try {
    const response = await API.post(requrest, payload.userdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.userToken}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const RemovefromFavorite = async payload => {
  const requrest = `/api/remove-wishlist-item`;
  try {
    const response = await API.post(requrest, payload.userdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.userToken}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const FCMtokenhandle = async payload => {
  const requrest = `/api/update-fcmToken`;
  try {
    const response = await API.post(requrest, payload.userdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.userToken}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    console.log('catch of fcm toke', err);
  }
};

const ScanedProducts = async payload => {
  console.log('payload', payload);
  const id = JSON.parse(payload.result);
  const requrest = `/api/qr-code-product/${id}`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.accessToken}`,
      },
    });
    const {data, status} = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    console.log('catch of fcm toke', err);
  }
};

export {
  userLogin,
  userRegister,
  HomeProducts,
  Wishlist,
  FavoritItemsList,
  Orderlist,
  Editprofile,
  ResetPassword,
  Forgetpass,
  Codeconfirmation,
  Changepassword,
  RemovefromFavorite,
  FCMtokenhandle,
  AboutUs,
  ScanedProducts,
  deleteUser,
};
