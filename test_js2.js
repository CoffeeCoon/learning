var current_year = new Array(12)
var current_month = new Array(42)
var today = new Date
var newYear = today.getFullYear()
var month_namber = today.getMonth()
var list_of_months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var list_of_days_of_week = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']


function full_year() {

    var d = new Date;
    var castom_date = d.setFullYear(newYear);

    for (var i = 0; i < 12; i++) {
        current_year[i] = [];
    }

    var days_in_all_month = new Array(12)
    for (var i = 0; i < 12; i++) {
        days_in_all_month[i] = (new Date(newYear, i + 1, 0)).getDate();
    }

    for (var i = 0; i < 12; i++) {
        arr = []
        d = new Date
        // debugger;
        d.setFullYear(newYear, i + 1)

        for (var a = 1; a < days_in_all_month[i] + 1; a++) {
            arr.push(a)
            // arr.push(newYear + '-' + i + '-'+ a)
        }

        for (var e = 0; e < days_in_all_month[i]; e++) {
            current_year[i].push(arr[e])
        }

        var dd = new Date;
        dd.setFullYear(newYear, i, 1)
        wd = dd.getDay() - 1
        miss_days = 0

        wd <= 0 ? miss_days = wd + 7 : miss_days = wd

        hh = days_in_all_month[i - 1]

        if (i === 0) {
            hh = 31
        }

        var len = days_in_all_month[i] + miss_days

        for (miss_days; miss_days > 0; miss_days--) {
            current_year[i].unshift(hh)
            hh--
        }
        var l = 1
        for (len; len < 42; len++) {
            current_year[i].push(l)
            l++
        }

    }

    // console.log(current_year)

}


var weekend_days = []
var out_month_days = []

function free_and_miss(parse_month) {
    var i = 0
    while (parse_month[i] < parse_month[i + 1]) {
        out_month_days.push(i)
        i++
    }
    out_month_days.push(i)


    var i = 41
    var arr = []
    while (parse_month[i] > parse_month[i - 1]) {
        arr.unshift(i)
        i--
    }
    arr.unshift(i)
    out_month_days = out_month_days.concat(arr)  // можно сортирануть через sort. но это скучно

    for (var i = 0; i < out_month_days.length; i++) {

    }

    for (var i = 0; i < 42; i++) {
        var w = (i + 1) % 7
        var ww = (i + 2) % 7
        if (w === 0 || ww === 0) {
            weekend_days.push(i)
        }
    }

}


function loging() {
    console.log(current_year)
    console.log
    console.log(weekend_days)
    console.log(out_month_days)
}

// function select_year(){
//     windo
// }

function creat_list_of_years() {
    var select_year = document.getElementById("select_year");

    for (var i = newYear - 10; i < newYear + 11; i++) {
        var year = document.createElement("option");
        if (i == 2018) {
            year.defaultSelected = true;
        }
        var yaer_value = document.createTextNode(i);
        year.appendChild(yaer_value);
        select_year.appendChild(year);
    }
}


function create_actual_year() {

    for (i = 0; i < 12; i++) {

        free_and_miss(current_year[i])

        var name = "num_of_month_of_year_" + i;
        var first_month = document.getElementById(name);
        var create_div = document.createElement("div");
        create_div.className = 'month_name';
        var create_a = document.createElement('a');
        var month_name_value = document.createTextNode(list_of_months[i]);
        create_a.appendChild(month_name_value);
        create_div.appendChild(create_a);
        first_month.appendChild(create_div);


        var create_div = document.createElement("div");
        create_div.className = 'week';
        first_month.appendChild(create_div);
        for (a = 0; a < 7; a++) {
            var day_of_week = document.createElement('div');
            day_of_week.className = 'week_day'
            var creat_value = document.createElement('a');
            var week_name_value = document.createTextNode(list_of_days_of_week[a]);
            creat_value.appendChild(week_name_value);
            day_of_week.appendChild(creat_value);
            create_div.appendChild(day_of_week)
        }


        var create_div_day = document.createElement("div");
        create_div_day.className = 'month_days';
        first_month.appendChild(create_div_day);
        for (x = 0; x < 42; x++) {
            var create_div = document.createElement("div");
            if (out_month_days.includes(x)) {
                create_div.className = 'day other_month_day';
            } else {
                create_div.className = 'day';
            }
            var create_a = document.createElement('a');
            var a_value = document.createTextNode(current_year[i][x])
            create_a.appendChild(a_value);
            create_div.appendChild(create_a);
            first_month.appendChild(create_div);
            create_div_day.appendChild(create_div);
        }
        out_month_days = []
    }
}