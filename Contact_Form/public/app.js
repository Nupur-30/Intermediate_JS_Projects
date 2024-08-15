document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    const nameInput = document.getElementById("name");
    const numberInput = document.getElementById("number");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const btnLocalStorage = document.getElementById("btnLocalStorage");

    btnLocalStorage.addEventListener("click", () => {
        if (validateForm()) {
            const formData = getFormData();

            // Get the current entry number from local storage or default to 1
            let entryNumber = localStorage.getItem("entryNumber") || 1;
            entryNumber = parseInt(entryNumber); // Convert to integer

            // Generate a key with the current entry number
            const key = `contactFormEntry${entryNumber}`;

            // Store the form data using the generated key
            localStorage.setItem(key, JSON.stringify(formData));

            // Increment the entry number for the next form submission
            localStorage.setItem("entryNumber", entryNumber + 1);

            alert(`Form data saved to local storage with key: ${key}`);
            form.reset(); // Reset the form after saving data
        }
    });

    function getFormData() {
        return {
            name: nameInput.value.trim(),
            number: numberInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };
    }

    btnEmail.addEventListener("click", () => {
        if (validateForm()) {
            const formData = getFormData();
            console.log(formData);
            const subject = encodeURIComponent("Contact Form Submission");
            const body = encodeURIComponent(`
                Name: ${formData.name}
                Phone Number: ${formData.number}
                Email: ${formData.email}
                Message: ${formData.message}
            `);
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=nupurmehlawat@gmail.com&su=${subject}&body=${body}`, '_blank');
            form.reset(); // Reset the form after sending email
        }
    });

    function validateForm() {
        const name = nameInput.value.trim();
        const number = numberInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        const nameValid = /^[a-zA-Z\s]+$/.test(name) && name.length >= 2;
        const numberValid = /^\d{10}$/.test(number);
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const messageValid = message.length >= 10;

        if (!nameValid) {
            alert("Name must be at least 2 characters long and contain only letters.");
            return false;
        }
        if (!numberValid) {
            alert("Phone number must be a valid 10-digit number.");
            return false;
        }
        if (!emailValid) {
            alert("Email must be a valid email address.");
            return false;
        }
        if (!messageValid) {
            alert("Message must be at least 10 characters long.");
            return false;
        }

        return true;
    }
});



