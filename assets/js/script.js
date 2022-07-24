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
                    var price1h = val.priceChange1h
                    var price1d = val.priceChange1d
                    var price1w = val.priceChange1w
                    const price1 = Number(price1h);
                    const price2 = Number(price1d);
                    const price3 = Number(price1w);
                    let styletext1 = 'color:green';
                    let styletext2 = 'color:green';
                    let styletext3 = 'color:green';
                    if(price1 < 0.01){
                       styletext1 = "color:red;"
                    }
                    if(price2 < 0.01){
                        styletext2 = "color:red;"
                    }
                    if(price3 < 0.01){
                        styletext3 = "color:red;"
                    }
                    // console.log(firstDigitNum);
                    // console.log(typeof firstDigitNum);
                    // console.log(cekval.slice(0,1))
                    $("#tbodyCryptoTable").append('<tr><td class="imgcontainer text-center align-center">'+ val.name +'  <img src="'+ val.icon +'" alt="" srcset=""></td><td class="text-center align-center">'+ val.rank +'</td><td class="text-center align-center">'+ val.availableSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +'</td><td class="text-center align-center">'+ val.totalSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +'</td><td class="text-center align-center cryptoPrice'+ i +'">IDR '+ val.price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +'</td><td class="text-center">1h Change : <span style="'+styletext1+'">'+val.priceChange1h+'%</span> 1d Change : <span style="'+styletext2+'">'+val.priceChange1d+'%</span> 1w Change : <span style="'+styletext3+'">'+val.priceChange1w+'%</span></td></tr>');
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
            $("#CryptoTable").DataTable({})
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
    // $("#divtimerloaddata").append("<div class='spinner-border' role='status'><span class='sr-only'>Loading...</span></div>")

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
        beforeSend: function(){
            $("#divtimerloaddata").empty()
        },
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

            $("#divtimerloaddata").append("<div class='spinner-border' role='status'><span class='sr-only'>Loading...</span></div> <span>Data Refresh in</span> <span class='timercountdown'></span> <span>sec</span>")

            let ctd = 59;
            var startTime = new Date().getTime();
            var interval = setInterval(function(){
                if(new Date().getTime() - startTime > 60000){
                    clearInterval(interval);
                    return;
                }
                $(".timercountdown").text(ctd)
                ctd--
            }, 1000); 
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