document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const starsEl = document.querySelectorAll('.fa-star');
    const emojisEl = document.querySelectorAll('.emoji-container .fa-regular');
    const colorArray = ['red', 'orange', 'yellow', 'blue', 'green'];
    const feedbackTextarea = document.getElementById('Feedback1');
    const charCounter = document.querySelector('.char-counter');
    const nameInput = document.getElementById('name');
    const lastNameInput = document.getElementById('last-name');
    const dobInput = document.getElementById('dob');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const nameError = document.getElementById('name-error');
    const lastNameError = document.getElementById('lastName-error');
    const dobError = document.getElementById('dob-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const form = document.getElementById('feedbackForm');
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('successMessage');
    const datetimeInput = document.getElementById('Feedback submission');
    let selectedEmoji = null;
  
    // Star Rating Functionality
    updateRating(0); // Initialize star rating
    starsEl.forEach((starEl, index) => {
      starEl.addEventListener('click', () => {
        updateRating(index);
      });
    });
  
    function updateRating(index) {
      starsEl.forEach((starEl, idx) => {
        if (idx < index + 1) {
          starEl.classList.add('active');
        } else {
          starEl.classList.remove('active');
        }
      });
  
      emojisEl.forEach((emojiEl) => {
        emojiEl.style.transform = `translateX(-${index * 50}px)`;
        emojiEl.style.color = colorArray[index];
      });
    }
  
    // Character Counter for Textarea
    feedbackTextarea.addEventListener('input', () => {
      const maxLength = feedbackTextarea.getAttribute('maxlength');
      const remaining = maxLength - feedbackTextarea.value.length;
      charCounter.textContent = `${remaining} characters remaining`;
    });
  
    // Real-Time Validation for Input Fields
    nameInput.addEventListener('input', validateName);
    lastNameInput.addEventListener('input', validateLastName);
    dobInput.addEventListener('input', validateDOB);
    emailInput.addEventListener('input', validateEmail);
    phoneInput.addEventListener('input', validatePhone);
  
    function validateName() {
      if (nameInput.value.trim() === '') {
        nameError.textContent = 'Please enter your first name.';
        nameInput.style.borderColor = 'red';
      } else {
        nameError.textContent = '';
        nameInput.style.borderColor = '';
      }
    }
    
    function validateLastName() {
      if (lastNameInput.value.trim() === '') {
        lastNameError.textContent = 'Please enter your last name.';
        lastNameInput.style.borderColor = 'red';
      } else {
        lastNameError.textContent = '';
        lastNameInput.style.borderColor = '';
      }
    }
    
    function validateDOB() {
      if (dobInput.value === '') {
        dobError.textContent = 'Please enter your date of birth.';
        dobInput.style.borderColor = 'red';
      } else {
        dobError.textContent = '';
        dobInput.style.borderColor = '';
      }
    }
    
    function validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailInput.style.borderColor = 'red';
      } else {
        emailError.textContent = '';
        emailInput.style.borderColor = '';
      }
    }
    
    function validatePhone() {
      const phonePattern = /^\+?[0-9\s-]{10,15}$/;
      if (!phonePattern.test(phoneInput.value)) {
        phoneError.textContent = 'Please enter a valid phone number.';
        phoneInput.style.borderColor = 'red';
      } else {
        phoneError.textContent = '';
        phoneInput.style.borderColor = '';
      }
    }
    
    document.addEventListener('DOMContentLoaded', () => {
      const fileInput = document.getElementById('documents');
      const fileLabel = document.getElementById('file-label');
      const fileNameDisplay = document.getElementById('file-name-display');
    
      fileInput.addEventListener('change', function () {
        if (fileInput.files.length > 0) {
          fileNameDisplay.textContent = `Selected: ${fileInput.files[0].name}`;
          fileLabel.textContent = "File Selected ✅"; // Change button text
        } else {
          fileNameDisplay.textContent = "No file selected";
          fileLabel.textContent = "Choose File"; // Reset button text
        }
      });
    });
  


    // Emoji Rating Functionality
    emojisEl.forEach((emoji) => {
      emoji.addEventListener('click', () => {
        emojisEl.forEach((e) => e.classList.remove('active'));
        emoji.classList.add('active');
        selectedEmoji = emoji;
      });
    });
  
    // Form Submission Functionality
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent default form submission
  
      // Validate Emoji Selection
      if (!selectedEmoji) {
        alert('Please select an emoji to rate your experience.');
        return; // Stop form submission if no emoji is selected
      }
  
      // Validate Datetime Input
      const dateTimeInput = document.getElementById('Feedback-submission');
const today = new Date().toISOString().slice(0, 16); // Get current date and time in YYYY-MM-DDTHH:MM format
dateTimeInput.min = today; // Set the minimum value to the current date and time

      // Validate Other Fields
      validateName();
      validateLastName();
      validateDOB();
      validateEmail();
      validatePhone();
  
      if (
        nameInput.value.trim() === '' ||
        lastNameInput.value.trim() === '' ||
        dobInput.value === '' ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value) ||
        !/^\+?\d{10,15}$/.test(phoneInput.value)
      ) {
        event.preventDefault(); // Prevent form submission if validation fails
        return;
      }
  
      // Disable the submit button to prevent multiple submissions
      submitButton.disabled = true;
  
      try {
        // Submit the form data using Fetch API
        const formData = new FormData(form);
        const response = await fetch('/submit-feedback', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          successMessage.classList.remove('hidden');
        
          // Redirect to a thank-you page after 3 seconds
          setTimeout(() => {
            window.location.href = '/thank-you.html';
          }, 3000);
        }
        else {
          alert('Submission failed. Please try again.');
          submitButton.disabled = false; // Re-enable the submit button
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
        submitButton.disabled = false; // Re-enable the submit button
      }
    });
  });

  function showError(input) {
    let errorElement = document.getElementById(input.id + '-error');

    if (input.value.trim() === '') {
        errorElement.innerHTML = "*"; // Show asterisk only if input is empty
    } else {
        errorElement.innerHTML = ""; // Remove asterisk if input is filled
    }
}

/* Attach validation to each input field */
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('name').addEventListener('input', function () {
        showError(this);
    });

    document.getElementById('lastName').addEventListener('input', function () {
        showError(this);
    });

    document.getElementById('dob').addEventListener('input', function () {
        showError(this);
    });
});
