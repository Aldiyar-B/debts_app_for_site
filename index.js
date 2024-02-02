


function validateInput(input) {
	var errorDiv = input.nextElementSibling;
	var value = parseFloat(input.value);

	if (isNaN(value) || value < 0) {
		// errorDiv.textContent = "Введите положительное число";
		input.value = ""; // Очищаем поле отрицательного значения
	}
}

function addProduct() {
	var productForms = document.getElementById("productForms");

	var form = document.createElement("div");
	form.classList.add("form");

	form.innerHTML = `
        <form>
            <label for="productName">Наименование товара</label>
            <input type="text" name="productName">
            <label for="quantity">Количество </label>
            <input type="text" name="quantity" pattern="\d+" title="Введите положительное число" required oninput="validateInput(this); recalculateTotalAmount()">
            <div class="error" id="quantityError"></div>
            <label for="price">Цена</label>
            <input type="text" name="price" pattern="\d+(\.\d{1,2})?" title="Введите положительное число" required oninput="validateInput(this); recalculateTotalAmount()">
			<label for="total">Сумма</label>
					<input type="text" name="total" readonly>
            <div class="error" id="priceError"></div>
			<button type="button" class="remove-button" onclick="removeProduct(this)">
			<svg style="width: 20px; height: 20px; color: red;" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
		</svg>
		</button>
		
		
			
        </form>
    `;

	// Добавляем слушатель событий к кнопке "Х"
	var removeButton = form.querySelector(".remove-button");
	removeButton.addEventListener("click", function () {
		productForms.removeChild(form);
		recalculateTotalAmount();
	});

	// Добавляем новую форму к контейнеру
	productForms.appendChild(form);

	// Пересчитываем общую сумму после добавления товара
	recalculateTotalAmount();
}

function removeProduct(button) {
	var form = button.parentNode;
	form.parentNode.removeChild(form);
	recalculateTotalAmount();
}


function recalculateTotalAmount() {
	var totalAmountElement = document.getElementById("totalAmount");
	var initialPaymentInput = document.getElementById("initialPaymentInput");
	var debtAmountElement = document.getElementById("debtAmount");
	var debtErrorElement = document.getElementById("debtError");

	var initialPaymentErrorElement = document.getElementById("initialPaymentError");
	var forms = document.querySelectorAll(".form");
	// В разделе "Условия погашения"
	var debtAmountElementConditions = document.getElementById("debtAmountConditions");
	var debtAmountElementConditions = document.getElementById("sellDebtAmountConditions");

	var totalAmount = 0;

	forms.forEach(function (form) {
		var quantity = parseFloat(form.querySelector('[name="quantity"]').value) || 0;
		var price = parseFloat(form.querySelector('[name="price"]').value) || 0;
		var total = quantity * price;
		totalAmount += total;

		// Обновляем значение поля "Сумма"
		form.querySelector('[name="total"]').value = total.toFixed(2);
	});

	totalAmountElement.textContent = totalAmount.toFixed(2);

	var initialPayment = parseFloat(initialPaymentInput.value) || 0;

	// Проверяем первоначальный взнос на отрицательное значение
	if (initialPayment < 0) {
		initialPaymentErrorElement.textContent = "Введите положительное число";
		initialPaymentInput.value = ""; // Очищаем поле отрицательного значения
	} else {
		initialPaymentErrorElement.textContent = "";
	}

	document.getElementById("initialPayment").textContent = initialPayment.toFixed(2);

	var debtAmount = totalAmount - initialPayment;

	// Проверяем сумму долга на отрицательное значение
	if (debtAmount < 0) {
		debtErrorElement.style.display = "block";
		debtAmountElement.textContent = "0.00";
	} else {
		debtErrorElement.style.display = "none";
		debtAmountElement.textContent = debtAmount.toFixed(2);
		debtAmountElementConditions.textContent = debtAmount.toFixed(2);

	}
	// Проверяем, если первоначальный взнос слишком большой и сумма долга меньше 0
	if (initialPayment > totalAmount) {
		debtErrorElement.style.display = "block";
		debtAmountElement.textContent = "0.00";
		debtAmountElementConditions.textContent = "0.00";
		document.getElementById("sellDebtAmountConditions").textContent = "0.00";
		document.getElementById("sellOnCreditButton").disabled = true; // блокировка кнопки
	} else {
		debtErrorElement.style.display = "none";
		debtAmountElement.textContent = debtAmount.toFixed(2);
		debtAmountElementConditions.textContent = debtAmount.toFixed(2);
		document.getElementById("sellDebtAmountConditions").textContent = debtAmount.toFixed(2);
		document.getElementById("sellOnCreditButton").disabled = false; // разблокировка кнопки
	}
}
// Функция для установки интервала погашения
function setRepaymentInterval(interval) {
	// Реализуйте логику, связанную с выбором интервала (неделя, 2 недели, месяц)
}

// Функция для расчета суммы погашения на основе выбранных условий
function calculateRepaymentAmount() {
	var repaymentDateInput = document.getElementById("repaymentDate");
	var previousAmountInput = document.getElementById("previousAmount");

	// Реализуйте логику для расчета суммы погашения на основе выбранной даты и введенной суммы
}

// Добавлена функция для добавления нового поля выбора даты
function addRepaymentDate() {
	var repaymentDatesContainer = document.getElementById("repaymentDatesContainer");

	// Check if the message has already been added
	if (!document.querySelector(".repayment-date-label")) {
		var newRepaymentDate = document.createElement("div");
		newRepaymentDate.classList.add("repayment-date");

		newRepaymentDate.innerHTML = `
			<label class="repayment-date-label" style="color: red; ">Эта функция доступна в ЛК.</label>
		`;

		repaymentDatesContainer.appendChild(newRepaymentDate);
	}
}

function removeRepaymentDate(button) {
	var repaymentDate = button.parentNode;
	repaymentDate.parentNode.removeChild(repaymentDate);
}



function sellOnCredit() {
	// Получаем элемент "wrapper"
	var wrapperElement = document.querySelector(".wrapper");

	// Получаем текущую высоту wrapper
	// var currentHeight = wrapperElement.clientHeight;
	// console.log(`${currentHeight - 500}`);
	// Скрываем весь текущий контент внутри "wrapper" с плавным затуханием


	// Скрываем весь текущий контент внутри "wrapper"
	wrapperElement.innerHTML = "";

	// Создаем новый элемент для отображения нужного текста
	var newTextElement = document.createElement("div");
	newTextElement.innerHTML = `
		<div class= "new-text-content" >
		<p class="p__big"> Так вы легко можете продавать товары и услуги в рассрочку!</p>
		<p>Это была пробная продажа в рассрочку, для подключения к сервису зарегистрируйтесь в <a class="link" href="https://lk.debitor-ka.ru/register"> личном кабинете </a>
	</div>
`;

	// Добавляем новый элемент к "wrapper"
	wrapperElement.appendChild(newTextElement);

	// Устанавливаем высоту wrapper обратно
	// wrapperElement.style.height = currentHeight + "px";

	// Очищаем данные в формах (это может потребоваться в зависимости от ваших требований)
	var forms = document.querySelectorAll(".form");
	forms.forEach(function (form) {
		form.querySelector('[name="productName"]').value = "";
		form.querySelector('[name="quantity"]').value = "";
		form.querySelector('[name="price"]').value = "";
		form.querySelector('[name="total"]').value = "";
	});

	// Прокручиваем к новому контенту
	newTextElement.scrollIntoView({ behavior: "smooth" });
	window.scrollBy(0, -2500);


}