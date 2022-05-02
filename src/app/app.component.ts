import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'credo';
  public isHidden: boolean = true;
  public signupCtrl!: FormGroup
  public focus: boolean = false;
  public score = 0;
  public datePickerCtrl!: FormGroup;
  public progressColor = '#7f1425';
  public showDate = false;
  private date = new Date();
  public Allmonths = [{
    value: 1,
    label: "January",
    current: false,
    selected: false
  },
  {
    value: 2,
    label: "February",
    current: false,
    selected: false
  },
  {
    value: 3,
    label: "March",
    current: false,
    selected: false
  },
  {
    value: 4,
    label: "April",
    current: false,
    selected: false
  },
  {
    value: 5,
    label: "May",
    current: false,
    selected: false
  },
  {
    value: 6,
    label: "Jun",
    current: false,
    selected: false
  },
  {
    value: 7,
    label: "July",
    current: false,
    selected: false
  },
  {
    value: 8,
    label: "August",
    current: false,
    selected: false
  },
  {
    value: 9,
    label: "September",
    current: false,
    selected: false
  },
  {
    value: 10,
    label: "Octber",
    current: false,
    selected: false
  },
  {
    value: 11,
    label: "November",
    current: false,
    selected: false
  },
  {
    value: 12,
    label: "December",
    current: false,
    selected: false
  },
  ]
  public AllYears = []
  currentYear!: number
  currentMonth!: number
  showedDays = [];
  selectedMonth!: number
  selectedYear!: number
  selectedDay!: number
  currentDay!: number
  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.signupForm();
    this.datePickerForm()
    this.passwordCtrl.valueChanges.subscribe((value) => {
      this.checkStrength(value)
    })
  }

  signupForm() {
    this.signupCtrl = this.fb.group({
      fullName: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      phoneNumber: this.fb.control(null, [Validators.required, Validators.pattern(/[0-9\+\-\ ]/)]),
      password: this.fb.control(null, [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,30}$/)
      ]),
      isAgree: this.fb.control(false, Validators.required)
    })
  }

  datePickerForm() {
    this.getToday();
    this.getYear()
    this.getMonth()
    
    this.datePickerCtrl = this.fb.group({
      year: this.fb.control(this.selectedYear),
      month: this.fb.control(this.selectedMonth),
      day: this.fb.control(this.selectedDay)
    })

    this.yearCtrl.valueChanges.subscribe((value) => {
      this.selectedYear = value
      this.showedDays = []
      this.getFirstDay()
    })

    this.monthCtrl.valueChanges.subscribe((value) => {
      this.selectedMonth = value
      this.resetCal()
      this.getYears()
      this.getFirstDay()
    })
  }

  showDatePicker() {
    this.getYears()
    this.getMonths()
    this.getFirstDay()
    this.showDate = true;
  }

  closeDatePicker() {
    this.resetCal()
    this.showDate = false;
  }

  submitDateSelection() {
    this.resetCal();
    this.showDate = false;
    console.log(this.datePickerCtrl.value)
  }

  onFocus() {
    this.focus = true
  }

  onBlur() {
    this.focus = false
  }

  getMonths() {
    this.Allmonths.forEach((month) => {
      if (month.value == this.currentMonth) {
        month.current = true
        month.selected = true
      }
    })
  }

  getYears() {

    for (let i = this.currentYear - 7; i < this.currentYear + 7; i++) {
      if (this.currentYear == i) {
        this.AllYears.push({
          value: i,
          label: i,
          current: true,
          selected: true
        })
      } else {
        this.AllYears.push({
          value: i,
          label: i,
          current: false,
          selected: false
        })
      }
    }
  }

  getToday() {
    this.currentDay = this.date.getDate()
    this.selectedDay = this.date.getDate()
  }
  getYear() {
    this.currentYear = this.date.getFullYear();
    this.selectedYear = this.date.getFullYear()
  }
  getMonth() {
    this.selectedMonth = this.date.getMonth() + 1
    this.currentMonth = this.date.getMonth() + 1;
  }
  getFirstDay() {
    var dayIndex = new Date(this.selectedYear + "-" + this.selectedMonth).getDay();
    var monthDays = new Date(this.selectedYear, this.selectedMonth, 0).getDate();

    let previousMonthDays

    if (this.selectedMonth != 1) {
      previousMonthDays = new Date(this.selectedMonth - 1, this.selectedYear, 0).getDate()
    }
    else {
      previousMonthDays = new Date(12, this.selectedYear, 0).getDate()
    }

    const leftDays = (41 - monthDays) + 2

    switch (dayIndex) {
      case 1:
        for (let i = 1; i <= monthDays; i++)
          if (i == this.currentDay) {
            this.showedDays.push({
              value: i,
              disabled: false,
              selected: false,
              current: true
            });
          } else {
            this.showedDays.push({
              value: i,
              disabled: false,
              selected: false,
              current: false
            });
          }

        for (let j = 1; j <= leftDays; j++) {
          this.showedDays.push({
            value: j,
            disabled: true,
          });
        }
        break;

      case 2:
        this.showedDays.push({
          value: previousMonthDays,
          disabled: true,
        });

        for (let i = 1; i <= monthDays; i++)
          if (i == this.currentDay) {
            this.showedDays.push({
              value: i,
              disabled: false,
              selected: false,
              current: true
            });
          } else {
            this.showedDays.push({
              value: i,
              disabled: false,
              selected: false,
              current: false
            });
          }

        for (let j = 1; j <= leftDays; j++) {
          this.showedDays.push({
            value: j,
            disabled: true,
          });
        }
        break;
      case 3:
        for (let p = previousMonthDays - 1; p <= previousMonthDays; p++)
          this.showedDays.push({
            value: p,
            disabled: true,
          });

        for (let i = 1; i <= monthDays; i++)
          if (i == this.currentDay) {
            this.showedDays.push({
              value: i,
              disabled: false,
              selected: false,
              current: true
            });
          } else {
            this.showedDays.push({
              value: i,
              disabled: false,
              selected: false,
              current: false
            });
          }

        for (let j = 1; j <= leftDays; j++) {
          this.showedDays.push({
            value: j,
            disabled: true,
          });
        }
        break;
      case 4:
        for (let p = previousMonthDays - 2; p <= previousMonthDays; p++)
          this.showedDays.push({
            value: p,
            disabled: true,
          });

        for (let i = 1; i <= monthDays; i++)
          if (i == this.currentDay) {
            this.showedDays.push({
              value: i,
              disabled: false,
              selected: false,
              current: true
            });
          } else {
            this.showedDays.push({
              value: i,
              disabled: false,
              selected: false,
              current: false
            });
          }

        for (let j = 1; j <= leftDays; j++) {
          this.showedDays.push({
            value: j,
            disabled: true,
          });
        }
        break;
      case 5:
        for (let p = previousMonthDays - 3; p <= previousMonthDays; p++)
          this.showedDays.push({
            value: p,
            disabled: true,
          });

        for (let i = 1; i <= monthDays; i++)
          if (i == this.currentDay) {
            this.showedDays.push({
              value: i,
              disabled: false,
              selected: false,
              current: true
            });
          } else {
            this.showedDays.push({
              value: i,
              disabled: false,
              selected: false,
              current: false
            });
          }

        for (let j = 1; j <= leftDays; j++) {
          this.showedDays.push({
            value: j,
            disabled: true,
          });
        }

        break;
      case 6:
        for (let p = previousMonthDays - 4; p <= previousMonthDays; p++)
          this.showedDays.push({
            value: p,
            disabled: true,
          });

        for (let i = 1; i <= monthDays; i++)
          if (i == this.currentDay) {
            this.showedDays.push({
              value: i,
              disabled: false,
              selected: false,
              current: true
            });
          } else {
            this.showedDays.push({
              value: i,
              disabled: false,
              selected: false,
              current: false
            });
          }

        for (let j = 1; j <= leftDays; j++) {
          this.showedDays.push({
            value: j,
            disabled: true,
          });
        }

        break;
      case 0:
        for (let p = previousMonthDays - 5; p <= previousMonthDays; p++)
          this.showedDays.push({
            value: p,
            disabled: true,
          });

        for (let i = 1; i <= monthDays; i++)
          if (i == this.currentDay) {
            this.showedDays.push({
              value: i,
              disabled: false,
              selected: false,
              current: true
            });
          } else {
            this.showedDays.push({
              value: i,
              disabled: false,
              selected: false,
              current: false
            });
          }
        for (let j = 1; j <= leftDays; j++) {
          this.showedDays.push({
            value: j,
            disabled: true,
          });
        }

        break;

    }

  }

  checkStrength(pass) {
    this.score = 0;
    this.progressColor = '#7f1425'
    let variations = {
      digits: /\D*\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      special: /.*[$@$!%*?&]/.test(pass),
      length: /.{8,30}/.test(pass)
    };


    for (let check in variations) {
      this.score += (variations[check]) ? 20 : 0;
      if (this.score == 0 || this.score == 20) {
        this.progressColor = '#7f1425'
      }
      else if (this.score == 40 || this.score == 60) {
        this.progressColor = '#ca1919'
      }
      else if (this.score == 80) {
        this.progressColor = '#ff7611'
      }
      else {
        this.progressColor = '#0ff74d'
      }
    }
  }

  resetCal() {
    this.showedDays = []
    this.AllYears = []
  }

  selectDay(day) {
    this.selectDay = day.value
    this.dayCtrl.setValue(this.selectDay)
    
    this.showedDays.forEach((d) => {
      if(day.value == d.value) {
        d.selected = true
      } else {
        d.selected = false
      }
    })
  }

  submit() {
    console.log(this.signupCtrl.value);
  }

  togglePasswordView() {
    this.isHidden = !this.isHidden
  }

  get fullNameCtrl() {
    return this.signupCtrl.get('fullName') as FormControl
  }

  get emailCtrl() {
    return this.signupCtrl.get('email') as FormControl
  }

  get phoneNumberCtrl() {
    return this.signupCtrl.get('phoneNumber') as FormControl
  }

  get passwordCtrl() {
    return this.signupCtrl.get('password') as FormControl
  }

  get yearCtrl() {
    return this.datePickerCtrl.get('year') as FormControl;
  }
  get monthCtrl() {
    return this.datePickerCtrl.get('month') as FormControl;
  }
  get dayCtrl() {
    return this.datePickerCtrl.get('day') as FormControl;
  }
}
