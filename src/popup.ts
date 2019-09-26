import * as $ from 'jquery';
import { type } from 'os';

let style = require('./styles/popupjs.scss');

interface btns {
    text:string,
    class:string,
    callback:string,
}

interface params {
    width: any,
    height: any,
    buttons: Array<btns>,
    heading: string,
    content: string,
    showClose: boolean,
    bgOpacity: number,
}

export class modal {
    public static modalID:string = modal.get_modal_id();

    constructor(params:any) {

        let show_footer:boolean = false;
        let show_close :boolean = false;
        let show_heading: boolean = false;
        let body_content: string = '';
        let heading     : string = '';
        let btn_content : string = '';

        if( params.hasOwnProperty('width') ) {
            let type = typeof( params.width );
            if( type !== 'number' && type !== 'string' ) throw new Error('Width Type not recognized. Accept auto or number');
        }

        if( params.hasOwnProperty('height') ) {
            let type = typeof( params.height );
            if( type !== 'number' && type !== 'string' ) throw new Error('Height Type not recognized. Accept auto or number');
        }

        if( params.hasOwnProperty('heading') ) {
            if( typeof (params.heading) !== 'string' )  throw new Error('Heading Type not recognized. Require String');
            heading = params.heading;
            show_heading = true;
        }

        if( params.hasOwnProperty('content') ) {
            if( typeof ( params.content ) !== 'string' ) throw new Error('Content Type recognized. Require String');
            body_content = params.content;
        }

        if( params.hasOwnProperty('showClose') ) {
            if( typeof( params.showClose ) !== 'boolean' ) throw new Error('showClose parameter need to be boolean');
            show_close = params.showClose;
        }

        if( params.hasOwnProperty('bgOpacity') ) {
            if( typeof( params.bgOpacity ) !== 'number' ) throw new Error('bgOpacity parameter need to be a number'); 
        }

        if( params.hasOwnProperty('buttons') ) {
            params.buttons.forEach(( btn_data:btns, i:number ) => {
                btn_content += modal.get_modal_btns( btn_data );
            });

            show_footer = true;
        }

        $('body')
        .append( modal.get_modal_template(show_close, show_footer, show_heading, heading, body_content, btn_content) );
        $('#popup--dark--bg').fadeIn('slow');
        $(`#${modal.modalID}`).fadeIn('slow');

        if( params.hasOwnProperty('bgOpacity') ) {
            $('#popup--dark--bg').css('background-color', `rgba(0, 0, 0, ${params.bgOpacity})`);
        }

        if( params.hasOwnProperty('width') ) {
            let width_type =  typeof( params.width );
            if( width_type === 'string' && params.width === 'auto' )
                $(`#${modal.modalID}`).css('max-width', params.width);

            if( width_type === 'number'  ) 
                $(`#${modal.modalID}`).css('max-width', `${params.width}px`);
        }

        if( params.hasOwnProperty('height') ) {
            let height_type = typeof( params.height );
            if( height_type === 'string' && params.height === 'auto' )
                $(`#${modal.modalID} .popup--body`).css('height', params.height);

            if( height_type === 'number'  ) 
                $(`#${modal.modalID} .popup--body`).css('height', `${params.height}px`);
        }

        return new Promise(( resolve:any, reject:any ) => {
            $(document).on('click', '.popup--wrapper', function() {
                modal.modal_close();
                resolve('closed');
            });

            $(document).on('click', '.--header--btn', function() {
                modal.modal_close();
                resolve('closed');
            });

            $(document).on('click', 'button[data-popup-callback]', function() {
                modal.modal_close();
                let callback = $(this).data( 'popup-callback' );
                resolve( callback );
            });
        });
    }

    static modal_close() {
        $(`#${modal.modalID}`).fadeOut('slow');
        $('#popup--dark--bg').fadeOut('slow');
        $(`#${modal.modalID}`).delay('slow').remove();
        $('#popup--dark--bg').delay('slow').remove();
    }

    static get_modal_id() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }

    static get_modal_height() {
        return $('.popup--content').outerHeight();
    }

    static get_modal_btns( btn_data:btns ) {

        let incomplete = false;

        if( btn_data.hasOwnProperty('text') ) {
            if( typeof (btn_data.text) !== 'string' ) throw new Error('Button:text parameter need to be string');
        } else {
            incomplete = true;
        }

        if( btn_data.hasOwnProperty('class') ) {
            if( typeof ( btn_data.class )  !== 'string' ) throw new Error('Button:class parameter need to be string');
        } else {
            incomplete = true;
        }

        if( btn_data.hasOwnProperty('callback') ) {
            if( typeof ( btn_data.callback ) !== 'string' ) throw new Error('Button:callback parameter need to be string or boolean');
        } else {
            incomplete = true;
        }

        if( incomplete )
            throw new Error('Button parameteres not complete');

        let btn_template = `<button class='popup--button ${btn_data.class}' data-popup-callback='${btn_data.callback}'>${btn_data.text}</button>`

        return btn_template;
    }

    static get_modal_template(show_close:boolean, show_footer:boolean, show_heading:boolean, heading:string, body_content:string, btn_content:string) {
        let template = `<div id='popup--dark--bg' class='popup--wrapper'></div>`;
        template += `<div id='${modal.modalID}' class='popup--content'>`;

        if( show_heading ) {
            template += `<div class='popup--section popup--header'><div class='--header--text'>${heading}</div>`

            if( show_close )
                template += `<div class='--header--btn'><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-x'><line x1='18' y1='6' x2='6' y2='18'></line><line x1='6' y1='6' x2='18' y2='18'></line></svg></div>`;
               
            template += `</div>`;
        }
    
        template += `<div class='popup--section popup--body'>${body_content}</div>`;

        if( show_footer ) 
            template += `<div class='popup--section popup--footer'>${btn_content}</div>`;

        template += `</div>`;

        return template;
    }
}