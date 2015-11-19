	(function($) {
	    $.fn.DateValidation = function(options) {
	        var targetElPlaceHolder,
	            targetEl,
	            date,
	            month,
	            year,
	            mappedDateObj = {},
	            y_m_d_Date = [],
	            transformedDate,
	            daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	            splitNmap = function(opts) {
	                var splittedDatePH = targetElPlaceHolder.split(opts.splitter),
	                    splittedDateVal = targetEl.split(opts.splitter);

	                splittedDatePH.map(function(val, key, arr) {
	                    mappedDateObj[splittedDatePH[key]] = splittedDateVal[key];
	                });

	                splittedDatePH.forEach(function(val, key, arr) {
	                    if (val.match(/d/i)) {
	                        date = mappedDateObj[val];
	                        y_m_d_Date[2] = date;
	                    } else if (val.match(/m/i)) {
	                        month = mappedDateObj[val] - 1;
	                        y_m_d_Date[1] = month;
	                    } else if (val.match(/y/i)) {
	                        year = mappedDateObj[val];
	                        y_m_d_Date[0] = year;
	                    }
	                });
	            }
	        initConfig = function(thisEl, opts) {
	            targetElPlaceHolder = $(thisEl).attr(opts.attribute);
	            targetEl = $(thisEl).val();
	            var self = thisEl;
	            /*var result = {};
	            result.instance = self;
	            result.opts = opts;*/
	            splitNmap(opts);
	            transformedDate = new Date(year, month, date);
	            $.DateValidation.init(thisEl, opts);
	        };

	        $.DateValidation = {
	        	result :{},
	            defaults: {
	                'splitter': '-',
	                'attribute': 'placeholder',
	                'beginYear': 1947,
	                'chkExceedsToday':false,
	                'difference': [0, 0, 0], // year, month, date
	                'cssForValidDate': 'validDate',
	                'cssForInvalidDate': 'invalidDate'
	            },
	            init: function(self, opts) {
	            	this.result = {};
	                if ($.DateValidation.isValidDate(self, opts)) {
	                    $.DateValidation.validateInputDate(self, opts);
	                }
	            },
	            isLeapYear: function(inputDate) {
	                var year = inputDate.getFullYear();
	                var isValid = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	                this.result.isLeapYear = isValid;
	                return isValid;
	            },
	            isValidDate: function(self, opts) {
	                var isValid = false;
	                if (y_m_d_Date[0] >= opts.beginYear) {
	                    var inputDate = new Date(y_m_d_Date[0], y_m_d_Date[1], y_m_d_Date[2]),
	                        febInLeapYear = ($.DateValidation.isLeapYear(inputDate) && y_m_d_Date[1] == 1 && y_m_d_Date[2] <= daysInMonth[y_m_d_Date[1]] + 1),
	                        daysInOtherMonths = y_m_d_Date[2] <= daysInMonth[y_m_d_Date[1]] && y_m_d_Date[1] != 1,
	                        febInNonLeapYear = (!$.DateValidation.isLeapYear(inputDate) && y_m_d_Date[1] == 1 && y_m_d_Date[2] <= daysInMonth[y_m_d_Date[1]]),
	                        chkValidMonth = ((y_m_d_Date[1] == 1) ? ((febInLeapYear || febInNonLeapYear) && y_m_d_Date[1] < daysInMonth.length) : y_m_d_Date[1] < daysInMonth.length),
	                        isValid = (y_m_d_Date[1] != 1) ? (chkValidMonth && daysInOtherMonths) : chkValidMonth;
	                    console.log("whether Input Date is Valid", isValid);
	                    this.result.validBeginYear = true;
	                } else {
	                    this.result.validBeginYear = false;

	                    console.log("whether Input Date is invalid as it is lesser than base limit Year ", opts.beginYear);
	                }
	                $.DateValidation.setStyleAfterValidation(self, opts, isValid);
	                if(this.result.validBeginYear)
	                this.result.isValidCalenderDate = isValid;
	                return isValid;
	            },
	            isNotExceedNow: function(inputDate) {
	                var today = new Date(),
	                    isValid = (inputDate <= today);
	                console.log("whether Input Date not exceeds Today", isValid);
	                this.result.isNotExceedNow = isValid;
	                return isValid;
	            },
	            isDiffFromNowMatched: function(year, month, date) {
	                //real month - 2 (refers February and not March)
	                year = typeof year == "undefined" ? 0 : (year >= 0) ? year : 0;
	                month = typeof month == "undefined" ? 0 : (month >= 0) ? month : 0;
	                date = typeof date == "undefined" ? 0 : (date >= 0) ? date : 0;
	                var today = new Date(),
	                    originalDate = new Date(y_m_d_Date[0], y_m_d_Date[1], y_m_d_Date[2]),
	                    diffInYear = today.getFullYear() - year,
	                    diffInMonth = (today.getMonth() - (month - 1)),
	                    diffInDate = today.getDate() - date,
	                    differencedDate = new Date(diffInYear, diffInMonth, diffInDate)
	                if (differencedDate > originalDate) {
	                    console.log("The Date Difference ", differencedDate, " ... ", originalDate, " success ");
	                    isValid = true;
	                    return isValid;
	                }
	                console.log("The Date Difference ", differencedDate, " ... ", originalDate, " Failed ");
	                isValid = false;
	                this.result.isDiffFromNowMatched = isValid;
	                return isValid;
	            },
	            validateInputDate: function(self, opts) {
	                var inputDate = new Date(y_m_d_Date[0], y_m_d_Date[1], y_m_d_Date[2]),
	                    isValid = (opts.chkExceedsToday ? $.DateValidation.isNotExceedNow(inputDate) : true) && $.DateValidation.isDiffFromNowMatched(opts.difference[0], opts.difference[1], opts.difference[2]);
	                $.DateValidation.setStyleAfterValidation(self, opts, isValid);
	                console.log("Result of Input Date Validation", isValid);
	                this.result.validatedInputDate = isValid;
	                return isValid;
	            },
	            setStyleAfterValidation: function(self, opts, isValid) {
	                $(self).removeClass(opts.cssForValidDate + ' ' + opts.cssForInvalidDate);
	                $(self).addClass(isValid ? opts.cssForValidDate : opts.cssForInvalidDate);
	            }
	        }

	        $(this).each(function(indx, elem) {
	            var opts = $.extend({}, $.DateValidation.defaults, options);
	            initConfig(this, opts);
	            $.DateValidation.result.instance = this;
	            $.DateValidation.result.opts = opts;
	            console.log("PC Date Validation Results", $.DateValidation.result);
	            return $.DateValidation.result;
	            console.log('----------------');
	        });
	    };
	})(jQuery, undefined);