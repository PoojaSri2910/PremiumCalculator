# PremiumCalculator
To calculate the individual monthly premium based on the age, dob, occupation and death sum assured

# All fields are mandatory:
Name, Age Next Birthday, Date of Birth (MM/YYYY), Occupation (dropdown) and Death Sum Insured

=> Currently Name, Age Next Birthday,Date of Birth(MM/YYYY), Death Sum Insured is entered manually
=> Each occupation is mapped to a Rating and Factor

| Occupation | Rating       | Factor |
| ---------- | ------------ | ------ |
| Cleaner    | Light Manual | 11.50  |
| Doctor     | Professional | 1.50   |
| Author     | White Collar | 2.25   |
| Farmer     | Heavy Manual | 31.75  |
| Mechanic   | Heavy Manual | 31.75  |
| Florist    | Light Manual | 11.50  |
| Other      | Heavy Manual | 31.75  |

=> If the user selects Other, it defaults to Heavy Manual.

# Premium Calculation
Death Premium = (Death Cover amount * Occupation Rating Factor * Age) /1000 * 12
Premium is displayed if all fields are valid and has no validation errors

# Error Messages

Error messages are shown if fields are empty or invalid.

Name → cannot be blank
Age → must be a positive number
DOB → must be provided
Occupation → must be selected
Death Sum Insured → must be a positive number

