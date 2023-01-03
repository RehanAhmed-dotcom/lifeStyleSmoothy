import Colors from '../colors/colors';

export const Homestyle = {
  container: {
    flex: 1,
  },
  descrView: {
    alignItems: 'center',
    padding: 12,
    paddingVertical: 10,
  },
  priceStyle: {
    fontSize: 14,
    color: Colors.pricecolor,
    fontFamily: 'Segoe UI Semibold',
  },

  topView: {
    // height: 250,
    flex: 1,
    marginVertical: 3,
    borderRadius: 5,
    width: '90%',
    backgroundColor: '#fff',
    elevation: 2,
  },
  promimagestyle: {
    height: 120,
    width: 120,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  pronameText: {
    fontSize: 16,
    color: Colors.orange,

    width: '100%',
    textAlign: 'center',
    fontFamily: 'Segoe UI Semibold',
  },
  prodescription: {
    fontSize: 15,
    color: 'black',
    paddingVertical: 4,
    fontFamily: 'Segoe UI',
  },
  priceview: {
    alignItems: 'flex-start',
    padding: 10,
    justifyContent: 'flex-end',
    flex: 1,
  },
};

export const homesubProdeuctdetail = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cartbtnstyle: {
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: Colors.orange,
  },
  proNamestyle: {
    fontSize: 20,
    color: Colors.orange,
    width: '100%',
    paddingVertical: 12,
    textAlign: 'center',
    fontFamily: 'Segoe UI Semibold',
  },
  prodescription: {
    fontSize: 16,
    color: 'black',
    width: 200,
    textAlign: 'center',
    paddingVertical: 4,
    fontFamily: 'Segoe UI',
  },
};

export const Ordersstyle = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  favIconview: {
    backgroundColor: Colors.orange,
    height: 30,
    width: 30,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  FavandpriceStyle: {
    height: 150,
    width: '20%',
    alignItems: 'center',
    paddingVertical: 20,
    justifyContent: 'flex-end',
  },
  nameAnddescriptionstyle: {
    height: 150,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  proImagestyle: {
    height: 80,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 3,
  },
  imageparentStyle: {
    height: 150,
    width: '30%',
    alignItems: 'center',
    paddingLeft: 12,
    justifyContent: 'center',
  },
  parentcontainer: {
    height: 150,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
  },
};

export const orderdetailsStyle = {
  container: {
    flex: 1,
  },
  imageview: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  topViewstyle: {
    flex: 3,
    padding: 12,
  },
  imagestyle: {
    height: 300,
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 5,
  },
  quanityAndpriceTextstyle: {
    fontFamily: 'Segoe UI',
  },
  iconView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  endViewstyle: {
    flex: 4,
    paddingHorizontal: 12,
    justifyContent: 'space-evenly',
  },
  quanitycontaier: {
    height: 50,
    backgroundColor: '#fff',
    elevation: 3,
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
  },
  statusescontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconscontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusesText: {
    fontFamily: 'Segoe UI',
    color: 'black',
  },
};
