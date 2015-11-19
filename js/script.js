var DateValidationConfig = function(type) {

    doSomeExtension();

    if (type == 'type1') {
        $('input.type1').DateValidation({
            'beginYear': 1957,
            'endYear': 2015,
            //'difference': [0, 10, 0],
            'chkExceedsToday': false,
            'attribute': 'data-dv',
            'splitter': '.',
            'cssForValidDate': 'pc-valid-date',
            'cssForInvalidDate': 'pc-invalid-date',
            'errorMessage': {
                'calenderDate': ' You have Entered the Date which is not available in Calender ',
                'leapYear': ' The year you have chosen is not a Leap Year ',
                'beginYear': ' The Date you entered is lesser than Begin Year ',
                'endYear': ' The Date you entered is greater than End Year ',
                'exceedsToday': '  The Date you entered exceeds today ',
                'finallyOnCondition': ' The Date Entered is invalid based on the configuration '
            }
        });
    }

    if (type == 'type2') {
        $('input.type2').DateValidation({
            //'beginYear': 1957,
            //'difference': [0, 10, 0],
            'chkExceedsToday': true,
            'attribute': 'data-dv',
            'splitter': '/',
            'cssForValidDate': 'pc-valid-date',
            'cssForInvalidDate': 'pc-invalid-date',
            'errorMessage': {
                'calenderDate': ' You have Entered the Date which is not available in Calender ',
                'leapYear': ' The year you have chosen is not a Leap Year ',
                'beginYear': ' The Date you entered is lesser than Begin Year ',
                'endYear': ' The Date you entered is greater than End Year ',
                'exceedsToday': '  The Date you entered exceeds today ',
                'finallyOnCondition': ' The Date Entered is invalid based on the configuration '
            }
        });
    }

    if (type == 'type3') {
        $('input.type3').DateValidation({
            'beginYear': 1957,
            'difference': [0, 10, 0],
            'chkExceedsToday': true,
            'attribute': 'placeholder',
            'splitter': '-',
            'cssForValidDate': 'pc-valid-date',
            'cssForInvalidDate': 'pc-invalid-date',
            'errorMessage': {
                'calenderDate': ' You have Entered the Date which is not available in Calender ',
                'leapYear': ' The year you have chosen is not a Leap Year ',
                'beginYear': ' The Date you entered is lesser than Begin Year ',
                'endYear': ' The Date you entered is greater than End Year ',
                'exceedsToday': '  The Date you entered exceeds today ',
                'finallyOnCondition': ' The Date Entered is invalid based on the configuration '
            }
        });
    }

    // doSomeExtension();

};

function doSomeExtension() {

    $.extend($.DateValidation, {
        'isPC': function() {
            console.log('isPC.....');
        }
    });

    console.log('do some extensions......');

}

DateValidationConfig();