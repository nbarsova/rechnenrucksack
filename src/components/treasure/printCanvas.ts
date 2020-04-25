import PDFDocument from 'pdfkit';
import fs from 'fs';

export const preparePrintPage = () => {

    let border=new Image();

    border.src=require('../../img/map-border-horizontal.svg');

    border.onload=function() {
        // return border.toDataURL();
    };


}
