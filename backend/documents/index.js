import moment from "moment";

export default (booking) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <style>
            @import "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css";

            body {
                text-align: center;
            }

            .ticket {
                display: inline-block;
                width: 350px;
                margin: 20px;
                background-color: #273138;
                border-radius: 10px;
                color: #fff;
                font-family: Helvetica Neue;
                font-weight: 300;
                letter-spacing: 1px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            }

            .ticket header {
                position: relative;
                height: 35px;
                background-color: #1b252e;
                padding: 10px;
                border-radius: 10px;
            }

            .ticket header .company-name {
                line-height: 35px;
                text-align: left;
            }

            .ticket header:after {
                content: '';
                width: 16px;
                height: 16px;
                background-color: #fff;
                position: absolute;
                bottom: -8px;
                right: -8px;
                border-radius: 50%;
                box-shadow: inset 12px 0px 18px -11px rgba(0, 0, 0, 0.5);
            }

            .ticket header:before {
                content: '';
                width: 16px;
                height: 16px;
                background-color: #fff;
                position: absolute;
                bottom: -8px;
                left: -8px;
                border-radius: 50%;
                box-shadow: inset -12px 0px 18px -11px rgba(0, 0, 0, 0.5);
            }

            .ticket .airports {
                padding: 5px 10px 10px 10px;
                height: 100px;
                text-align: center;
                position: relative;
                border-bottom: 2px dashed #000;
            }

            .ticket .airports .airport {
                position: relative;
                margin: 10px;
                text-align: center;
                display: inline-block;
            }
            
            .ticket .airports .airport .airport-code {
                font-size: 20px;
                margin: 5px 0;
            }

            .ticket .airports .airport .dep-arr-label {
                color: #000000;
                font-size: 12px;
                font-weight: 500;
            }

            .ticket .airports .airport .time {
                font-size: 20px;
                color: #000000;
            }

            .ticket .airports .airport:first-child {
                margin-right: 40%;
            }

            .ticket .airports .airport:first-child:after {
                font-family: FontAwesome;
                color: #000000;
                content: "\f072";
                position: absolute;
                font-size: 50px;
                top: calc(50% - 15px);
                right: -110%;
            }

            .ticket .airports:after {
                content: '';
                width: 16px;
                height: 16px;
                background-color: #fff;
                position: absolute;
                bottom: -8px;
                right: -8px;
                border-radius: 50%;
                box-shadow: inset 12px 0px 18px -11px rgba(0, 0, 0, 0.5);
            }

            .ticket .airports:before {
                content: '';
                width: 16px;
                height: 16px;
                background-color: #fff;
                position: absolute;
                bottom: -8px;
                left: -8px;
                border-radius: 50%;
                box-shadow: inset -12px 0px 18px -11px rgba(0, 0, 0, 0.5);
            }

            .ticket .place {
                padding: 10px;
                text-align: center;
                height: 330px;
            }

            .ticket .place-block {
                display: inline-block;
                margin: 10px 5px;
            }
            
            .ticket .place-block .place-label {
                color: #0d4971;
                text-transform: uppercase;
                font-weight: 400;
                font-size: 14px;
                margin-bottom: 5px;
            }

            .ticket .place-block .place-value {
                color: #000000;
                font-size: 14px;
                font-weight: 500;
            }

            .ticket .qr {
                width: 220px;
                height: 220px;
                margin: 20px auto;
                border-radius: 10px;
                overflow: hidden;
            }

            .ticket .qr img {
                width: 100%;
                height: 100%;
            }

            .ticket.inverse {
                background-color: #ffffff;
            }

            .ticket.inverse header {
                background-color: #0d4971;
            }

            .ticket.inverse .airports {
                border-bottom-color: #d3d6da;
            }

            .ticket.inverse .airport:first-child:after {
                color: #d3d6da;
            }

            .ticket.inverse .airport .airport-code {
                color: #000000;
                font-weight: 500;
            } 
        </style>
    </head>
            <body>
                <div class="ticket inverse">
                    <header>
                        <div class="company-name">${booking.flight.airline}</div>
                    </header>
                    <section class="airports">
                    <div class="airport">
                        <div class="airport-code">${booking.flight.townFrom}</div>
                        <div class="dep-arr-label">Departing</div>
                        <div class="time">${moment(booking.flight.dateOut).format('HH:mm')}</div>
                    </div>
                    <div class="airport">
                        <div class="airport-code">${booking.flight.townTo}</div>
                        <div class="dep-arr-label">Arriving</div>
                        <div class="time">${moment(booking.flight.dateIn).format('HH:mm')}</div>
                    </div>
                    </section>
                    <section class="place">
                        <div class="place-block">
                            <div class="place-label">PASSENGER NAME</div>
                            <div class="place-value">${booking.user.surname + " " + booking.user.name}</div>
                        </div>
                        <div class="place-block">
                            <div class="place-label">FLIGHT</div>
                            <div class="place-value">${booking.flight.name}</div>
                        </div>
                        <div class="place-block">
                            <div class="place-label">PNR</div>
                            <div class="place-value">${booking.ticketId}</div>
                        </div>
                    <div class="qr">
                        <img src="http://www.classtools.net/QR/pics/qr.png" />
                    </div>
                    </section>
                </div>
            </body>
        </html>
    `;
};