import {Canvas, Document, Font, Image, Page, StyleSheet, Text, View} from "@react-pdf/renderer";
import {FormattedMessage} from "react-intl";
import React from "react";

const PrintPage = (props: {dataURI: any}) => {

    console.log(props.dataURI);

    Font.register({ family: 'Neucha', src: '/fonts/Neucha/Neucha.ttf' });

    const styles = StyleSheet.create({
         page: {
            flexDirection: 'column',
            border: "1px solid red",
             fontFamily: 'Neucha'
        },
        header: {
             fontSize: 40
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
            height: 200,
            backgroundColor: 'blue'
        }
    });

    const pdf = (<Document>
        <Page size="A4" orientation='landscape' style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>Where is the stone?</Text>
            </View>
            <View style={styles.section}>
                <Image src='/img/map-border-horizontal.svg'/>
            </View>
        </Page>
    </Document>);
    return pdf;
}

export default PrintPage;
