
//script jam navbar 
$(document).ready(function() {
    clockUpdate();
    setInterval(clockUpdate, 1000);
})

function clockUpdate() {
    var date = new Date();
    // $('#digital-clock').css({'color': '#fff', 'text-shadow': '0 0 6px #ff0'});
    function addZero(x) {
        if (x < 10) {
        return x = '0' + x;
        } else {
        return x;
        }
    }

    function twelveHour(x) {
        if (x > 12) {
        return x = x + 0;
        } else if (x == 0) {
        return x = 12;
        } else {
        return x;
        }
    }

    var yr = addZero(date.getFullYear());
    var mt = addZero(date.getMonth());
    var d = addZero(date.getDate());
    var h = addZero(twelveHour(date.getHours()));
    var m = addZero(date.getMinutes());
    var s = addZero(date.getSeconds());
    // var ms = addZero(date.getMilliseconds());

    $('#digital-clock').text(d + "/" + mt + "/" + yr + "            " + h + ':' + m + ':' + s)
}

// countdown hari H
$(document).ready(function(){
    // Set the date we're counting down to
    var countDownDate = new Date("Jun 24, 2022 14:35:00").getTime();
    var countDownDateFirst = new Date("Jun 25, 2021 07:20:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();
        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        let progressNew = ((countDownDate - countDownDateFirst) - distance) ;
        let firstPercentVal = countDownDate - countDownDateFirst;
        
        let diffPercentBetween = (firstPercentVal - progressNew) / ((firstPercentVal + progressNew) / 2) * 100;
        let diffPercentBetweenRounded = 100 - diffPercentBetween;

        let diffPercentBetweenRounded2 = diffPercentBetweenRounded.toFixed(2);
        let diffPercentBetweenRounded5 = diffPercentBetweenRounded.toFixed(6);

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("demo").innerHTML = days + "D " + ": "+ hours + " h" + ": " 
        + minutes + " m" + ": " + seconds + " s";

        $("#progressBarId").attr("aria-valuenow", now);
        $("#progressBarId").attr("aria-valuemax", countDownDate);
        $("#progressBarId").css("width", diffPercentBetweenRounded2+"%")
        document.getElementById("progressBarValue").innerText = diffPercentBetweenRounded5+"%";
        
        

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED CONTRACT";
        }
    }, 1000);


    let sortethnow = $("#selectGraphicParam").val()
    // if (sortethnow == '24h'){
    //     setInterval(getdatagrafik('24h'),5000)
    // }


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
                    $("#tbodyCryptoTable").append('<tr>');
                    $("#tbodyCryptoTable").append('<td class="imgcontainer text-center align-center">'+ val.name +'  <img src="'+ val.icon +'" alt="" srcset=""></td>');
                    $("#tbodyCryptoTable").append('<td class="text-center align-center">'+ val.rank +'</td>');
                    $("#tbodyCryptoTable").append('<td class="text-center align-center">'+ val.availableSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +'</td>');
                    $("#tbodyCryptoTable").append('<td class="text-center align-center">'+ val.totalSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +'</td>');
                    $("#tbodyCryptoTable").append('<td class="text-center align-center cryptoPrice'+ i +'">IDR '+ val.price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +'</td>');
                    $("#tbodyCryptoTable").append('</tr>');
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
    // let acuankita = $("#valuehiddenacuan").val()
    // console.log()
    // ambilparameter()
    // getdatagrafik(acuankita)

    // var paramssss = $(this).val()
    // setInterval(function(){
    //     getdatagrafik(acuankita)
    // },5000);
        
})

function ambilparameter(e){
    let acuankita = $("#valuehiddenacuan").val()
    var intervall =  setInterval(function(){
        getdatagrafik($("#valuehiddenacuan").val())
    },5000);

    // var refreshIntervalId = setInterval(fname, 10000);

    /* later */
    // clearInterval(intervall);
}

// function sortbytime(){
    // $("#selectGraphicParam").on("change", function(){
        // let param = $("#selectGraphicParam").val()
        // console.log(param)
        // setInterval(getdatagrafik(param), 5000);
    // })
// }

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