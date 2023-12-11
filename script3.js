$(document).ready(function() {
    // Обновить список постов при загрузке страницы
    refreshPosts();
    // Обработчик отправки формы модального окна
    $("#saveButton").click(function() {
        event.preventDefault();
        savePost();
    });

    // Обработчик клика на кнопку "Отмена" модального окна
    $("#cancelButton").click(function() {
        hideModal();
    });
	$("#theme").click(function() {
        toggleTheme();
    });
});

// Функция для получения списка постов
function refreshPosts() {
	$.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "GET",
        success: function(data) {
            $("#posts").empty();
            data.forEach(function(post) {
                displayPost(post);
            });
        }
    });
}
let u_id=0;
let show=0;
// Функция для отображения поста
function displayPost(post) {
    var postElement = $("<div>")
        .addClass("post")
		.append($("<p>").text("userId " + post.userId))
        .append($("<p>").text("Id " + post.id))
        .append($("<h3>").text(post.title))
        .append($("<p>").text(post.body))
        .append($("<button>").text("Редактировать").click(function() {
			showModal(post.id,post.userId,post.title,post.body);
        }))
        .append($("<button>").text("Удалить").click(function() {
            deletePost(post.id,post.userId,post.title,post.body);
        }));
    $("#posts").append(postElement);
	u_id = post.id;
}

// Функция для отображения модального окна для создания/редактирования поста
function showModal(postId, userId, postTitle, postBody) {
    $("#postId").val(postId);
    $("#userId").val(userId);
    $("#title").val(postTitle);
    $("#body").val(postBody);
    $("#userIdError").hide();
    $("#modal").fadeIn();
	show=postId;
}

// Функция для скрытия модального окна
function hideModal() {
   // $("#modal").fadeOut();
}

function deletePost(id,userId,title,body){
	$.ajax({
    url: "https://jsonplaceholder.typicode.com/posts/"+id,
	type: "DELETE",
	success: function(response){
		alert("Удалено");
	},
	error: function(xhr, status, error)
	{
		console.log(xhr,status,error);
		alert("Ошибка");
	}
	});
}

// Функция для сохранения поста (создание или редактирование)
function savePost() {
	event.preventDefault() 
if(show==0)
{
 var u_id1=u_id+1;
 var userId_p = document.getElementById("userId").value;
 var title_p = document.getElementById("title").value;
 var body_p = document.getElementById("body").value;
 let dataf = {
		id: u_id1,
		userId: userId_p,
		title: title_p,
		body: body_p
	};
 var jsonString = JSON.stringify(dataf);
  // Режим создания - отправить POST запрос
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/posts",
	type: "POST",
	dataType: 'json',
    data: jsonString,
	success: function(response){
		console.log("ответ"+response);
		alert("Успешно");
	},
	error: function(xhr, status, error)
	{
		console.log(xhr,status,error);
		alert("Ошибка");
	}
 });
}
else
{
 var userId_p = document.getElementById("userId").value;
 var title_p = document.getElementById("title").value;
 var body_p = document.getElementById("body").value;
 let dataf = {
		id: show,
		userId: userId_p,
		title: title_p,
		body: body_p
	};
	 $.ajax({
    url: "https://jsonplaceholder.typicode.com/posts/" + show,
	type: "PUT",
	dataType: 'json',
    data: jsonString,
	success: function(response){
		alert("Успешно ");
	},
	error: function(xhr, status, error)
	{
		console.log(xhr,status,error);
		alert("Ошибка");
	}
 });
}
}
function toggleTheme(){
                $('body').toggleClass('light-mode dark-mode');
                var currentTheme = $('body').hasClass('light-mode') ? 'light' : 'dark';
                localStorage.setItem('theme', currentTheme);
                if (currentTheme === 'light') {
                    $('#saveButton, #cancelButton, button, #title, #body, #userId, #important, #posts, #modalForm, #modal, #modalTitle').css('background-color', '#fff');
                    $('#saveButton, #cancelButton, button, #title, #body, #userId, #important, #posts, #modalForm, #modal,#modalTitle').css('color', '#000');
                } else {
                    $('#saveButton, #cancelButton, button, #title, #body, #userId, #important, #posts, #modalForm, #modal,#modalTitle').css('background-color', '#333');
                    $('#saveButton, #cancelButton, button, #title, #body, #userId, #important, #posts, #modalForm, #modal,#modalTitle').css('color', '#fff');
                }

            // Проверяем сохраненную тему в localStorage при загрузке страницы
            var savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                $('body').addClass(savedTheme + '-mode');
                if (savedTheme === 'dark') {
                    $('#saveButton, #cancelButton,button,#title, #body, #userId, #important, #posts, #modalForm,#modal,#modalTitle').css('background-color', '#333');
                    $('#saveButton, #cancelButton,button, #title, #body, #userId, #important, #posts, #modalForm, #modal,#modalTitle').css('color', '#fff');
                }
            }
}