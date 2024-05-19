document.addEventListener("DOMContentLoaded", function() {
    const questionDiv = document.getElementById("question");
    const inputValue = document.getElementById("inputValue");
    const addButton = document.getElementById("addButton");
    const nextButton = document.getElementById("nextButton");
    const resultDiv = document.getElementById("result");
    const dinheiroResult = document.getElementById("dinheiroResult");
    const creditoResult = document.getElementById("creditoResult");
    const creditoDescontoResult = document.getElementById("creditoDescontoResult");
    const creditoTotalResult = document.getElementById("creditoTotalResult");
    const debitoResult = document.getElementById("debitoResult");
    const debitoDescontoResult = document.getElementById("debitoDescontoResult");
    const debitoTotalResult = document.getElementById("debitoTotalResult");
    const pixResult = document.getElementById("pixResult");
    const totalResult = document.getElementById("totalResult");
    const descontoTotalResult = document.getElementById("descontoTotalResult");
    const totalAposDescontoResult = document.getElementById("totalAposDescontoResult");
    const backToStartButton = document.getElementById("backToStart");

    let currentStep = 0;
    let dinheiroTotal = 0;
    let creditoTotal = 0;
    let debitoTotal = 0;
    let pixTotal = 0;

    const questions = [
        "Quanto entrou em dinheiro?",
        "Quanto entrou em cartão de crédito?",
        "Quanto entrou em cartão de débito?",
        "Quanto entrou em PIX?"
    ];

    function showQuestion() {
        if (currentStep < questions.length) {
            questionDiv.textContent = questions[currentStep];
            addButton.style.display = "inline-block";
            if (currentStep > 0) {
                nextButton.style.display = "none";
            }
        } else {
            showResult();
        }
        inputValue.focus(); // Inicia com o campo de entrada selecionado
    }

    function showResult() {
        const creditoDesconto = creditoTotal * 0.0499;
        const creditoTotalAposDesconto = creditoTotal - creditoDesconto;
        const debitoDesconto = debitoTotal * 0.0199;
        const debitoTotalAposDesconto = debitoTotal - debitoDesconto;
        const totalDesconto = creditoDesconto + debitoDesconto;
        const total = dinheiroTotal + creditoTotal + debitoTotal + pixTotal;
        const totalAposDesconto = total - totalDesconto;

        dinheiroResult.textContent = `R$ ${dinheiroTotal.toFixed(2)}`;
        creditoResult.textContent = `R$ ${creditoTotal.toFixed(2)}`;
        creditoDescontoResult.textContent = `R$ ${creditoDesconto.toFixed(2)}`;
        creditoTotalResult.textContent = `R$ ${creditoTotalAposDesconto.toFixed(2)}`;
        debitoResult.textContent = `R$ ${debitoTotal.toFixed(2)}`;
        debitoDescontoResult.textContent = `R$ ${debitoDesconto.toFixed(2)}`;
        debitoTotalResult.textContent = `R$ ${debitoTotalAposDesconto.toFixed(2)}`;
        pixResult.textContent = `R$ ${pixTotal.toFixed(2)}`;
        totalResult.textContent = `R$ ${total.toFixed(2)}`;
        descontoTotalResult.textContent = `R$ ${totalDesconto.toFixed(2)}`;
        totalAposDescontoResult.textContent = `R$ ${totalAposDesconto.toFixed(2)}`;

        questionDiv.style.display = "none";
        inputValue.style.display = "none";
        addButton.style.display = "none";
        nextButton.style.display = "none";
        resultDiv.style.display = "block";
    }

    addButton.addEventListener("click", function() {
        const value = parseFloat(inputValue.value) || 0;
        
        if (currentStep === 0) {
            dinheiroTotal += value;
        } else if (currentStep === 1) {
            creditoTotal += value;
        } else if (currentStep === 2) {
            debitoTotal += value;
        } else if (currentStep === 3) {
            pixTotal += value;
        }

        inputValue.value = "";
        inputValue.focus();
    });

    nextButton.addEventListener("click", function() {
        currentStep++;
        showQuestion();
    });

    inputValue.addEventListener("input", function() {
        nextButton.style.display = "inline-block";
    });

    // Adiciona um ouvinte de evento para a tecla "Enter"
    inputValue.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            // Simula um clique no botão "Adicionar"
            addButton.click();
        }
    });

    backToStartButton.addEventListener("click", function() {
        window.scrollTo(0, 0); // Scroll de volta para o topo da página
        location.reload(); // Recarrega a página para reiniciar
    });

    showQuestion();
});
