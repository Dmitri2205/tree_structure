# tree_structure

Реализация:приложение состоит из 3 основных компонентов - Header,Layout и Content.
Данные берутся из локального json файла в той же директории, что и store для RTK. Сохранение файла происходит с помощью js(создание элемента ссылки=>добавления download ссылки с Blob=>эмуляция клика по элементу.
Для редактирования свойств, нужно выбрать продукт. Свойства отобразятся на главном экране с вкладками свойств продукта(объекта).
Клик по свойству вызовет поле ввода.
При потери фокуса с поля ввода, введённое значение применится к свойству, сохранив его название.


TODO:изменение данных в структуре при редактировании конкретных свойств.