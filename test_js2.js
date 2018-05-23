var current_year = new Array(12)
var current_month = new Array(42)
var today = new Date
var newYear = today.getFullYear()
var month_namber = today.getMonth()
var list_of_months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var list_of_days_of_week = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
var list_of_friend_emails = ['pavel@directual.com', 'd.orinichev@directual.com', 'v.kirillov@directual.com', 'a.sidorenkov@directual.com', 'l.pestereva@directual.com', 's.pesterev@directual.com', 'n.morozov@directual.com', 'lojkin.powarejkin@directual.com']



function full_year(some_date) {

    var d = new Date;
    var castom_date = d.setFullYear(some_date);

    for (var i = 0; i < 12; i++) {
        current_year[i] = [];
    }

    var days_in_all_month = new Array(12)
    for (var i = 0; i < 12; i++) {
        days_in_all_month[i] = (new Date(some_date, i + 1, 0)).getDate();
    }

    for (var i = 0; i < 12; i++) {
        arr = []
        d = new Date
        d.setFullYear(some_date, i + 1)

        for (var a = 1; a < days_in_all_month[i] + 1; a++) {
            arr.push(a)
            // arr.push(newYear + '-' + i + '-'+ a)
        }

        for (var e = 0; e < days_in_all_month[i]; e++) {
            current_year[i].push(arr[e])
        }

        var dd = new Date;
        dd.setFullYear(some_date, i, 1)
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
    buff_date = new Date
    buff_year = buff_date.getFullYear()

    for (var i = buff_year - 10; i < buff_year + 11; i++) {
        var year = document.createElement("option");
        if (i == newYear) {
            year.defaultSelected = true;
        }
        year.value = i
        var yaer_value = document.createTextNode(i);
        year.appendChild(yaer_value);
        select_year.appendChild(year);
    }
}

function remove_list_of_years(){
    var select_year = document.getElementById("select_year");
    select_year.innerHTML = ''
}


function selected_year(){
    var selected_year = +document.getElementById("select_year").options[document.getElementById("select_year").selectedIndex].text;

    full_year(selected_year);
    remove_full_year_view();
    create_actual_year();
    newYear = selected_year
    
}

function create_actual_year() {

    for (i = 0; i < 12; i++) {
        out_month_days = [];

        free_and_miss(current_year[i])

        var name = "num_of_month_of_year_" + i;
        var first_month = document.getElementById(name);
        var create_div = document.createElement("div");
        create_div.className = 'month_name';
        create_div.id = 'month_name';
        var create_a = document.createElement('a');
        var month_name_value = document.createTextNode(list_of_months[i]);
        create_a.appendChild(month_name_value);
        create_div.appendChild(create_a);
        first_month.appendChild(create_div);


        var create_div = document.createElement("div");
        create_div.className = 'week';
        create_div.id = 'week';
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
        create_div_day.id = 'month_days';
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
        
    }
}


var buffer_date = new Date
var buffer_year = buffer_date.getFullYear()
function left_calendar() {
    var panel_month = document.getElementById('left_calen')
    var reserve_date = new Date;
    var reserve_month = reserve_date.getMonth();
    var reserve_year = reserve_date.getFullYear();
    var create_div = document.createElement("div");
    create_div.className = 'panel_month_days';
    create_div.id = 'panel_month_days'
    panel_month.appendChild(create_div);
    cur_month = month_namber;
    free_and_miss(current_year[cur_month]);

    for (i = 0; i < 42; i++) {
        var create_div_day = document.createElement("div");
        if(out_month_days.includes(i)){
            create_div_day.className = 'panel_day other_month_day'
        } else {
            create_div_day.className = 'panel_day';

            if (current_year[cur_month][i] == today.getDate() && reserve_month == month_namber && reserve_year == newYear){
                create_div_day.style.backgroundColor = 'red';
                create_div_day.style.color = 'white'
            }
        }
        var creatre_a_day = document.createElement('a')
        var create_a_value = document.createTextNode(current_year[cur_month][i])
        creatre_a_day.appendChild(create_a_value);
        create_div_day.appendChild(create_a_value);
        create_div.appendChild(create_div_day)
        
    }

    var name_of_month = document.getElementById('name_of_month_panel');
    var name_of_month_value = document.createTextNode(list_of_months[month_namber])
    name_of_month.appendChild(name_of_month_value)

    var value_of_year = document.getElementById('year_panel')
    var value_of_year_value = document.createTextNode(buffer_year)
    value_of_year.appendChild(value_of_year_value)

}

function panel_month_back(event) {
    month_namber -= 1;
    if (month_namber == '-1'){
        month_namber = 11
        buffer_year -= 1
        full_year(buffer_year)
    }
    remove_left_calendar();
}

function panel_month_ahead(event) {
    month_namber += 1;
    if (month_namber == '12'){
        month_namber = 0
        buffer_year += 1
        full_year(buffer_year)
    }
    remove_left_calendar();
}

function remove_left_calendar(){
    var panel_month = document.getElementById('left_calen')
    var panel_month_child = document.getElementById('panel_month_days')
    panel_month.removeChild(panel_month_child)
    var remove_month_name = document.getElementById('name_of_month_panel');
    remove_month_name.innerHTML = ''
    var remove_year_value = document.getElementById('year_panel')
    remove_year_value.innerHTML = ''
    left_calendar();
    out_month_days = [];
}
var end_of_donw = newYear - 10;
function switch_year_back(event) {
    if (newYear > end_of_donw){
        newYear -= 1;
        full_year(newYear);
        remove_full_year_view();
        create_actual_year();
        remove_list_of_years();
        creat_list_of_years();
    }
   
    
}
var end_of_up = newYear + 10;
function switch_year_forward(event) {
    if (newYear < end_of_up){
        newYear += 1;
        full_year(newYear);
        remove_full_year_view();
        create_actual_year();
        remove_list_of_years();
        creat_list_of_years();
    }
   
}

function switch_year_current(event) {
    buff_date = new Date
    buff_year = buff_date.getFullYear()

    newYear = buff_year;
    full_year(newYear);
    remove_full_year_view();
    create_actual_year();
    remove_list_of_years();
    creat_list_of_years();
}

function remove_full_year_view(){
    for (i = 0; i < 12; i++) {

        var name = "num_of_month_of_year_" + i;
        var first_month = document.getElementById(name);
        var delite_month_name = document.getElementById('month_name');
        var delite_week_days = document.getElementById('week')
        var delite_days = document.getElementById('month_days')

        first_month.removeChild(delite_month_name)
        first_month.removeChild(delite_week_days)
        first_month.removeChild(delite_days)

    }
}







