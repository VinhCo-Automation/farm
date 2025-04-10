document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("stage-select");
    const content = document.getElementById("content");

    select.addEventListener("change", () => {
        const value = select.value;
        content.innerHTML = ""; // Xóa nội dung cũ

        if (value === "stage-seedling" || value === "stage-growth" || value === "stage-fruit" || value === "stage-nurturing" || value === "stage-sweetening") {
            let stageTitle;
            if (value === "stage-seedling") {
                stageTitle = "Giai đoạn Cây Non";
            } else if (value === "stage-growth") {
                stageTitle = "Giai đoạn Tăng Trưởng";
            } else if (value === "stage-fruit") {
                stageTitle = "Giai đoạn Tuyển Trái";
            } else if (value === "stage-nurturing") {
                stageTitle = "Giai đoạn Nuôi Quả";
            } else if (value === "stage-sweetening") {
                stageTitle = "Giai đoạn Tạo ngọt";
            }

            content.innerHTML = `
                <h2>${stageTitle}</h2>

                <p><strong>Số liệu tăng trưởng:</strong></p>
                <label for="leaf-count">Số lượng lá:</label>
                <input type="text" id="leaf-count" placeholder="Nhập số lượng lá..." required>
                
                <label for="leaf-length">Độ dài lá (mm):</label>
                <input type="text" id="leaf-length" placeholder="Nhập độ dài lá..." required>

                <label for="leaf-width">Độ rộng lá (mm):</label>
                <input type="text" id="leaf-width" placeholder="Nhập độ rộng lá..." required>

                <p><strong>Số liệu sâu, bệnh hại:</strong></p>
                <div class="radio-group">
                    <label>
                        <input type="radio" name="pest" value="no" checked> Không
                    </label>
                    <label>
                        <input type="radio" name="pest" value="yes"> Có
                    </label>
                </div>
                <textarea id="pest-desc" placeholder="Mô tả sâu hại (nếu có)..." style="display: none;"></textarea>

                <div class="radio-group">
                    <label>
                        <input type="radio" name="disease" value="no" checked> Không
                    </label>
                    <label>
                        <input type="radio" name="disease" value="yes"> Có
                    </label>
                </div>
                <textarea id="disease-desc" placeholder="Mô tả bệnh hại 
(nếu có)..." style="display: none;"></textarea>

                <p><strong>Số liệu nước, phân:</strong></p>
                <label for="water-amount">Nước tưới (ml):</label>
                <input type="text" id="water-amount" placeholder="Nhập lượng nước tưới..." required>

                <label for="fertilizer-amount">Phân tưới (ml):</label>
                <input type="text" id="fertilizer-amount" placeholder="Nhập lượng phân tưới..." required>
            `;
            if (value === "stage-fruit") {
                content.innerHTML += `
                    <p><strong>Tỉ lệ đậu trái:</strong></p>
                    <label for="fruit-rate">Tỉ lệ đậu trái (%):</label>
                    <input type="number" id="fruit-rate" placeholder="Nhập tỉ lệ đậu trái..." required>
                `;
            } else if (value === "stage-nurturing") {
                content.innerHTML += `
                    <p><strong>Trọng lượng trái:</strong></p>
                    <div id="fruit-weight-container">
                        <label for="fruit-weight-1">Trọng lượng trái 1 (gram):</label>
                        <input type="number" id="fruit-weight-1" class="fruit-weight" placeholder="Nhập trọng lượng trái 1..." required>
                    </div>
                    <button id="add-fruit-weight" style="margin-top: 10px; padding: 5px 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; font-size: 14px; cursor: pointer;">
                        Thêm Trái
                    </button>
                `;
            }

            content.innerHTML += `
                <p><strong>Hình ảnh minh họa:</strong></p>
                <input type="file" id="upload-image" accept="image/*" multiple>
                <p id="image-preview"></p>
                <p id="image-limit-warning" style="color: red; display: none;">Chỉ được phép tải tối đa 2 ảnh!</p>

                <button id="confirm-button" style="margin-top: 20px; padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
                    Xác Nhận Gửi
                </button>
            `;

            // Hiển thị hoặc ẩn mô tả sâu hại
            const pestOptions = document.getElementsByName("pest");
            pestOptions.forEach(option => {
                option.addEventListener("change", () => {
                    const pestDesc = document.getElementById("pest-desc");
                    pestDesc.style.display = option.value === "yes" ? "block" : "none";
                });
            });

            // Hiển thị hoặc ẩn mô tả bệnh hại
            const diseaseOptions = document.getElementsByName("disease");
            diseaseOptions.forEach(option => {
                option.addEventListener("change", () => {
                    const diseaseDesc = document.getElementById("disease-desc");
                    diseaseDesc.style.display = option.value === "yes" ? "block" : "none";
                });
            });

            // Thêm logic cho nút "Thêm Trái" ở giai đoạn Nuôi Trái
            if (value === "stage-nurturing" || value === "stage-sweetening") {
                const fruitWeightContainer = document.getElementById("fruit-weight-container");
                const addFruitButton = document.getElementById("add-fruit-weight");
                let fruitCount = 1;

                // Logic thêm trái
                addFruitButton.addEventListener("click", () => {
                    fruitCount++;
                    const newFruitInput = document.createElement("div");
                    newFruitInput.className = "fruit-item";
                    newFruitInput.id = `fruit-weight-${fruitCount}-container`;
                    newFruitInput.innerHTML = `
                        <label for="fruit-weight-${fruitCount}">Trọng lượng trái ${fruitCount} (gram):</label>
                        <input type="number" id="fruit-weight-${fruitCount}" class="fruit-weight" placeholder="Nhập trọng lượng trái 
${fruitCount}..." required>
                        <button class="delete-button" data-id="fruit-weight-${fruitCount}-container" style="margin-left: 10px; padding: 5px; background-color: #FF6347; color: white; border: none; border-radius: 5px; font-size: 14px; cursor: pointer;">
                            Xóa
                        </button>
                    `;
                    fruitWeightContainer.appendChild(newFruitInput);
                    // Thêm logic xóa trái ngay khi tạo
                    const deleteButton = newFruitInput.querySelector(".delete-button");
                    deleteButton.addEventListener("click", () => {
                        const targetId = deleteButton.getAttribute("data-id");
                        const targetElement = document.getElementById(targetId);
                        fruitWeightContainer.removeChild(targetElement);
                    });
                });

                // Logic xóa trái ban đầu
                const initialDeleteButton = document.querySelector(".delete-button");
                if (initialDeleteButton) {
                    initialDeleteButton.addEventListener("click", () => {
                        const targetId = initialDeleteButton.getAttribute("data-id");
                        const targetElement = document.getElementById(targetId);
                        fruitWeightContainer.removeChild(targetElement);
                    });
                }
            }

            // Xử lý hiển thị xem trước hình ảnh (giữ lại ảnh đã chọn, giới hạn 2 ảnh)
            const uploadInput = document.getElementById("upload-image");
            const imagePreview = document.getElementById("image-preview");
            const limitWarning = document.getElementById("image-limit-warning");

            let uploadedImages = []; // Mảng chứa ảnh đã tải lên

            uploadInput.addEventListener("change", () => {
                const files = Array.from(uploadInput.files);

                // Kiểm tra tổng số ảnh đã tải
                if (uploadedImages.length + files.length > 2) {
                    limitWarning.style.display = "block"; // Hiển thị cảnh báo
                    return;
                }

                limitWarning.style.display = "none"; // Ẩn cảnh báo

                files.forEach(file => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const img = document.createElement("img");
                        img.src = reader.result;
                        img.alt = "Hình ảnh đã tải lên";
                        img.style.maxWidth = "100px";
                        img.style.margin = "10px";
                        imagePreview.appendChild(img);
                        uploadedImages.push(file); // Thêm ảnh vào danh sách đã tải lên
                    };
                    reader.readAsDataURL(file);
                });
            });

            // Xử lý hành động khi nhấn nút "Xác Nhận Gửi"
            const confirmButton = document.getElementById("confirm-button");
            confirmButton.addEventListener("click", () => {
                const inputs = document.querySelectorAll('input[required]');
                let allValid = true;

                
                if (!allValid) {
                    alert("Vui lòng điền đầy đủ thông tin trước khi gửi.");
                } else {
                    // Thu thập dữ liệu nhập
                    const leafCount = document.getElementById("leaf-count").value;
                    const leafLength = document.getElementById("leaf-length").value;
                    const leafWidth = document.getElementById("leaf-width").value;
                    const waterAmount = document.getElementById("water-amount").value;
                    const fertilizerAmount = document.getElementById("fertilizer-amount").value;

                    // Ví dụ dữ liệu bổ sung từ giai đoạn Nuôi Quả
                    const fruitWeights = Array.from(document.querySelectorAll('.fruit-weight')).map(input => input.value);

                    // Gói dữ liệu thành một object
                    const data = {
                        leafCount,
                        leafLength,
                        leafWidth,
                        waterAmount,
                        fertilizerAmount,
                        fruitWeights,
                    };

                    // Gửi dữ liệu lên server qua API
                    fetch('https://nlu-fet-td.space/iot2050run', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data),
                    })
                    .then(response => response.json())
                    .then(data => {
                        alert(data.message); // Hiển thị thông báo từ server
                    })
                    .catch(error => {
                        console.error('Lỗi khi gửi dữ liệu:', error);
                    });
                }
            });
        }
    });
});