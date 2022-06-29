$(document).ready(function(){
    

    //const utama buat save id coin
    const dataForGrafikLine = []
    
    // ini ajax utama, dia tarik data crypto, + ada id coin yg nanti buat nyari data pergerakan harga
    $.ajax({
        type: "GET",
        url: "https://api.coinstats.app/public/v1/coins",
        data: {
            skip : "0",
            limit : "5",
            currency : "IDR"
        },
        dataType: "json",
        success: function (response) {
            $.each(response, function( index, value ) {    
                let i = 0;            
                $.each(value, function(ind, val){
                    $("#tbodyCryptoTable").append('<tr><td class="imgcontainer text-center align-center">'+ val.name +'  <img src="'+ val.icon +'" alt="" srcset=""></td><td class="text-center align-center">'+ val.rank +'</td><td class="text-center align-center">'+ val.availableSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +'</td><td class="text-center align-center">'+ val.totalSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +'</td><td class="text-center align-center cryptoPrice'+ i +'">IDR '+ val.price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +'</td><td class="text-center">24h Change : '+val.priceChange1h+'% 1d Change : '+val.priceChange1d+'% 1w Change : '+val.priceChange1w+'%</td></tr>');
                    // $("#tbodyCryptoTable").append('<td>');
                    // $("#tbodyCryptoTable").append('</td>')
                    // $("#tbodyCryptoTable").append('<td class="imgcontainer text-center align-center">'+ val.name +'  <img src="'+ val.icon +'" alt="" srcset=""></td>');
                    // $("#tbodyCryptoTable").append('<td class="text-center align-center">'+ val.rank +'</td>');
                    // $("#tbodyCryptoTable").append('<td class="text-center align-center">'+ val.availableSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +'</td>');
                    // $("#tbodyCryptoTable").append('<td class="text-center align-center">'+ val.totalSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +'</td>');
                    // $("#tbodyCryptoTable").append('<td class="text-center align-center cryptoPrice'+ i +'">IDR '+ val.price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +'</td>');
                    // $("#tbodyCryptoTable").append('<td class="text-center">24h Change : '+val.priceChange1h+'% 1d Change : '+val.priceChange1d+'% 1w Change : '+val.priceChange1w+'%</td>')
                    // $("#tbodyCryptoTable").append('</tr>');
                    i++
                })
            });

        },
        complete: function(a, b){
            
        }
        
    });

    // $.ajax({
    //     type: "GET",
    //     url: "https://api.coinstats.app/public/v1/charts",
    //     data: {
    //         period : "24h",
    //         coinId : 'ethereum',
    //         // currency : "IDR"
    //     },
    //     dataType: "json",
    //     success: function (response) {
    //         console.log(response)
    //         $.each(response, function(index, value){ 
    //             $.each(value, function(ind, val){ 
    //                 dataForGrafikLine.push(val[1])
    //             })
    //         })
    //         const valueGrafik = []
    //         const labelGrafik = []
    //         $.each(dataForGrafikLine, function(idx, vle){
    //             let value = $("#hidden"+idx).val()
    //             valueGrafik.push(value)
    //             labelGrafik.push(idx)
    //         })
    //         $("#grafikHargaETH").remove()
    //         $("#divforcanvas").append("<canvas id='grafikHargaETH'></canvas>");
            
    //         generategrafikchartjs(dataForGrafikLine)
            
    //     }
    // });

    // struktur data ancur disini
    // let param = '24h';
    // setInterval(function(){
    //     getdatagrafik(sortethnow), 50000 
    // }) 
    var params = $(".selectGraphicParam").val()
    setInterval(getCryptoData, 120000);
    let idacuan = params;
    $("#hiddendivforacuan").append('<input type="hidden" name="" id="valuehiddenacuan" value="'+idacuan+'">')
    ambilparameter()
    // setInterval(function(){
    //     getdatagrafik('24h')
    //     }, 30000
    // );

});

$(document).on("change", ".selectGraphicParam", function(){
    var parameter = $(this).val()
    console.log(parameter)
    $("#valuehiddenacuan").val(parameter)        
})

function ambilparameter(e){
    let acuankita = $("#valuehiddenacuan").val()
    getdatagrafik($("#valuehiddenacuan").val())
    var intervall =  setInterval(function(){
        getdatagrafik($("#valuehiddenacuan").val())
    },60000);
}

function getdatagrafik(param){
    $.ajax({
        type: "GET",
        url: "https://api.coinstats.app/public/v1/charts",
        data: {
            period : param,
            coinId : 'ethereum',
            // currency : "IDR"
        },
        dataType: "json",
        success: function (response) {
            console.log(response)
            const dataForGrafikLine = []
            $.each(response, function(index, value){ 
                $.each(value, function(ind, val){ 
                    dataForGrafikLine.push(val[1])
                })
            })
            const valueGrafik = []
            const labelGrafik = []
            $.each(dataForGrafikLine, function(idx, vle){
                let value = $("#hidden"+idx).val()
                valueGrafik.push(value)
                labelGrafik.push(idx)
            })
            $("#grafikHargaETH").remove()
            $("#divforcanvas").append("<canvas id='grafikHargaETH'></canvas>");

            generategrafikchartjs(dataForGrafikLine)
        }
    });
}

function getCryptoData(){
    
    $.ajax({
        type: "GET",
        url: "https://api.coinstats.app/public/v1/coins",
        data: {
            skip : "0",
            limit : "5",
            currency : "IDR"
        },
        dataType: "json",
        beforeSend: function(){
        },
        success: function (response) {
            $.each(response, function( index, value ) {
                let i = 0;
                $.each(value, function(ind, val){
                    $(".cryptoPrice"+ i).empty()
                    $(".cryptoPrice"+ i).text('IDR '+ val.price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +'');

                    i++
                })
            });

        }
    });
}


function generategrafikchartjs(dataForGrafikLine){
    const valueGrafik = []
    const labelGrafik = []
    $.each(dataForGrafikLine, function(idx, vle){
        let value = $("#hidden"+idx).val()
        valueGrafik.push(value)
        labelGrafik.push(idx)
    })
    var ctxdivfor = document.getElementById("grafikHargaETH").getContext("2d");
    const chartdivfor = new Chart(ctxdivfor,  {
        type: 'line',
        data: {
            labels: labelGrafik,
            datasets: [
                {
                data: dataForGrafikLine,
                borderColor: 'red',
                // type: 'line',
                datalabels: {
                    display : false
                },
                // pointBackgroundColor: 'red',
                },
            ],
        },
        options: {
            elements: {
                point:{
                    radius: 0
                }
            },
            layout: {
            padding: {
                left: 5,
                right: 5,
                },
            },
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
            legend: {
                display: false,
                title: false
                },
            },
            tooltips: {
                callbacks: {
                   label: function(tooltipItem) {
                          return tooltipItem.yLabel;
                   }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                }
            }
        },
    });
}