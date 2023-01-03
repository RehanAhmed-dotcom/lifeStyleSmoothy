import React from 'react';
import {WebView} from 'react-native-webview';

const STRIPE_PK =
  'pk_live_51Jp7fgAMcsdYJcgK0Okts6DSVmN435nXe2w3O0DpG4A8qQpXJyMmT5e6qn7HD7om0kCeyl4wwJqgUtLUjFrz8y8Y00NnrCelvo';
//   'pk_test_51Jp7fgAMcsdYJcgKlXQ3zyQclscSC4P0gf4tZGt4CetG0KKb8DaqDTFKwQU71orVVI3eTyvF6bNWv1ocDC98NtSm00NFHNjZc9';
//   'pk_test_51IdudfCvAFj9FKm2BjB9BBL8Os9tP9oShx9SWEZKChOsVUJj2tmoW4suTr1FK8TcqV8g6vzeNo8BPAxC1PGy3Ip1003XooWJb9';
//   'pk_test_51HvymlGLtED8OU7vFyNEROH2QkmBUp0P9vgIeQlnMbGAQgvBfysBgV92b2pU5oOA9Pwi3YKT4UOnykZiWf9C3UtP00wz1a5ZEc';
//pk_live_51I5xsZHfpGzqPMuxHqecfHvFjzKLLYE9GKWrtDufVmLyXLdgzvMaIgMBpb4Xrs6YvitIu86jjQpYNxSmNUcle3dw00szaUE6QI
export default function (props) {
  const {title, qty, price, subtotal} = props;
  const onCheckStatus = response => {
    // console.log('this is on payment', props.onCheckStatus(response));
    props.onCheckStatus(response);
  };

  const htmlContent = `
                <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Payment Page</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                <link rel="preconnect" href="https://fonts.gstatic.com">
                <script src="https://js.stripe.com/v3/"></script>

                <style>
                ::-webkit-input-placeholder { /* Edge */
                color: white;
                }

                :-ms-input-placeholder { /* Internet Explorer */
                color: white;
                }

                ::placeholder {
                color: white;
                }

                body{
                    position:absolute;
                    left:0px;
                    right:0px;
                    top:0px;
                }
                .membership-container{
                     display:flex;
                     flex-direction: row;
                     justify-content: space-between;
                     align-items: center;
                     margin-top:20px;

                }
                .card{
                    background-color: #ef6c00;
                    border-radius: 10px !important;
                    margin-top:50px;
                }
                .card-holder{
                    display: flex;
                    flex-direction: column;
                    height: 150px;
                    justify-content: space-around;
                    background-color: #ef6c00;
                    border-radius: 20px;
                    padding: 10px;
                    padding-top: 20px;
                    padding-bottom: 20px;
                    margin-top: 50px;
                    margin-bottom: 50px;

                }
                .card-element{
                    height: 100px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                }
                .card-name{
                    padding: 20;
                    color: '#FFF';
                    font-weight: 500;
                    font-size: '25px';
                    background-color: transparent;
                    border: none;

                }
                input {
                    outline:none;
                    color: #FFF;
                    font-size: '25px';
                    font-weight: 500;
                    background-color: transparent;
                    }
                    .row{
                        margin-top: '50px';
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                    }

                    .products-info{
                        width: 100%;
                        padding: 20px;
                        text-align: center;
                        color:#11005D;
                        text-transform: uppercase;

                    }

                    .card-errors{
                        color: red;
                    }
                    .pay-btn{
                        display: flex;
                        height: 50px;
                        justify-content: center;
                        align-items: center;
                        // width: 100%;
                        margin: 30px;
                    }
                .custom-btn{
                    background-color:#ef6c00;
                    color:#FFFFFF !important;
                    box-shadow: none !important;
                    border-radius: 50px !important;
    outline: none !important;
                }
                .btn {
                    background-color:#ef6c00 ;
                    border: none;
                    color: white;
                    padding: 12px 16px;
                    font-size: 16px;
                    cursor: pointer;
                  }
                  
               

                </style>

            </head>
            <body>
                <!-- product info -->
                <div class="container-fluid">
                    <div class="row">
                        <div class="products-info">
                           <span style="font-size: 17px;color:#979797;font-weight: bold">Order Detail</span>
                           
                           
                            <span style="font-size: 17px;color:#979797;font-weight: bold"></span>
                        </div>
                    </div>
                    <div class="membership-container">
                    <div class="membership">
                          <span style="color:#979797;font-size: 16px;font-weight: bold">Product Name<span>
                        </div>
                        <div class="membership">
                          <span style="color:#979797;font-size: 16px">${title}<span>
                        </div>
                        </div>
                        <div class="membership-container">
                        <div class="membership">
                              <span style="color:#979797;font-size: 16px;font-weight: bold">Quanitity<span>
                            </div>
                            <div class="membership">
                              <span style="color:#979797;font-size: 16px">${qty}<span>
                            </div>
                            </div>
                            <div class="membership-container">
                            <div class="membership">
                                  <span style="color:#979797;font-size: 16px;font-weight: bold">Price<span>
                                </div>
                                <div class="membership">
                                  <span style="color:#979797;font-size: 16px;">${
                                    qty * price
                                  }<span>
                                </div>
                                </div>
                        <form>
                        <div class="card" >
                            <div class="card-holder">
                                    <input type="text" placeholder="Card Holder Name" id="card-name" class="card-name" />

                                    <div id="card-element" class="card-element">

                                        <div class="form-row">
                                            <label>
                                                <span >Card number</span>
                                                <input type="text" size="20" data-stripe="number">
                                            </label>
                                        </div>


                                        <div class="form-row">
                                        <label>
                                            <span>CVC</span>
                                            <input type="text" size="4" data-stripe="cvc">
                                        </label>
                                        </div>

                                    </div>

                                </div>

                            </div>
                            <div class="row">
                        <label class="card-errors" id="card-errors"></label>
                    </div>
                                <div class="pay-btn">
                                    <input type="submit" class="btn btn-lg btn-block custom-btn" value="Pay Now" />
                                </div>

                        </form>

                <script>
                    var stripe = Stripe('${STRIPE_PK}');

                    var elements = stripe.elements();

                        var card = elements.create("card", {
                            hidePostalCode: true,
                            style: {
                                base: {
                                color: '#979797',
                                fontWeight: 500,
                                fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
                                fontSize: '20px',
                                fontSmoothing: 'antialiased',
                                '::placeholder': {
                                    color: '#FFFFFF',
                                },
                                ':-webkit-autofill': {
                                    color: '#979797',
                                },
                            },
                            invalid: {
                                color: '#FC011F',
                                '::placeholder': {
                                    color: 'red',
                                },
                            },
                            }
                        });

                        // Add an instance of the card Element into the 'card-element' <div>.
                        card.mount('#card-element');

                        /**
                         * Error Handling
                         */

                        //show card error if entered Invalid Card Number
                        function showCardError(error){
                            document.getElementById('card-errors').innerHTML = ""
                            if(error){
                                document.getElementById('card-errors').innerHTML = error
                            }
                        }

                        card.on('change', function(event) {
                            if (event.complete) {
                                showCardError()
                                // enable payment button
                            } else if (event.error) {
                                const { message} = event.error
                                console.log(message)
                                showCardError(message)
                            }
                        });

                        card.mount('#card-element');

                        /**
                         * Payment Request Element
                         */
                        //  var paymentRequest = stripe.paymentRequest({
                        //     country: "US",
                        //     currency: "usd",
                        //     total: {
                        //         label: "Total",
                        //         amount: ${subtotal},
                                
                        //     }
                        // });

                        var form =  document.querySelector('form');

                        form.addEventListener('submit', function(e) {
                            e.preventDefault();

                            var additionalData = {
                                name: document.getElementById('card-name').value,
                                address_line1: undefined,
                                address_city:  undefined,
                                address_state: undefined,
                                address_zip: undefined,
                            };

                            stripe.createToken(card, additionalData).then(function(result) {

                            console.log(result);

                            if (result.token) {
                                window.postMessage(JSON.stringify(result));
                            } else {
                                window.postMessage(JSON.stringify(result));
                            }
                        });

                        })

                </script>

            </body>
            </html>

    `;

  const injectedJavaScript = `(function() {
        window.postMessage = function(data){
            window.ReactNativeWebView.postMessage(data);
        };
    })()`;

  const onMessage = (event: any) => {
    const {data} = event.nativeEvent;
    onCheckStatus(data);
  };

  return (
    <WebView
      javaScriptEnabled={true}
      style={{flex: 1}}
      originWhitelist={['*']}
      source={{
        html: htmlContent,
        baseUrl: 'https://intechsol.co',
      }}
      injectedJavaScript={injectedJavaScript}
      onMessage={onMessage}
    />
  );
}
