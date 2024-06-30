document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendButton');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.querySelector('.chat-messages');
    const progressTracker = document.getElementById('progressTracker');

    const steps = [
        { id: 'step1', name: 'Labour reached', status: 'pending' },
        { id: 'step2', name: 'Task 1', status: 'pending' },
        { id: 'step3', name: 'Task 2', status: 'pending' },
        { id: 'step4', name: 'Payment', status: 'pending' }
    ];

    const labourProfile = {
        name: "John Doe",
        email: "johndoe@example.com",
        bio: "Web designer and developer with a passion for creating intuitive user experiences."
    };

    const createStepElement = (step) => {
        const stepDiv = document.createElement('div');
        stepDiv.classList.add('step', step.status);
        stepDiv.id = step.id;

        const stepName = document.createElement('p');
        stepName.textContent = step.name;
        stepDiv.appendChild(stepName);

        const statuses = ['completed', 'in-progress', 'pending'];
        statuses.forEach(status => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = step.id;
            input.value = status;
            if (step.status === status) {
                input.checked = true;
            }
            label.appendChild(input);
            label.append(status.charAt(0).toUpperCase() + status.slice(1));
            stepDiv.appendChild(label);
        });

        return stepDiv;
    };

    const updateProgressTracker = () => {
        steps.forEach(step => {
            const stepElement = createStepElement(step);
            progressTracker.appendChild(stepElement);
        });
    };

    const updatelabourProfile = () => {
        document.getElementById('userName').textContent = `Name: ${labourProfile.name}`;
        document.getElementById('userEmail').textContent = `Email: ${labourProfile.email}`;
        document.getElementById('userBio').textContent = `Bio: ${labourProfile.bio}`;
    };

    const addMessage = (message, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    sendButton.addEventListener('click', () => {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user');
            chatInput.value = '';
            setTimeout(() => {
                addMessage('Your question has been received.', 'bot');
            }, 1000);
        }
    });

    const updateStepStatus = () => {
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('completed', 'in-progress', 'pending');
            const selectedStatus = document.querySelector(`input[name="${step.id}"]:checked`).value;
            step.classList.add(selectedStatus);
        });
    };

    updateProgressTracker();
    updatelabourProfile();
    updateStepStatus();

    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            const stepId = event.target.name;
            const selectedStatus = event.target.value;
            const step = steps.find(s => s.id === stepId);
            step.status = selectedStatus;
            updateStepStatus();
        });
    });
});
