Web Cloud File Manager is an MVC demo app built in Angular JS and PHP.

This simple sample app consumes it's own repository and displays it back to the end user in a sleak and responsive user interface.

PHP:
- Model layer
- AJAX services
- Autoloader

Responsive UI:
- View layer
- Foundation Framework integration

AngularJS and Javascript:
- Controller layer
- AngularJS module pattern
- Custom Directive
- jQuery plugin integration

Testing:
- A full suite of hand written PHP unit tests
- PHPunit installer included

Directions:

1.) Install and run WAMP or XAMPP server

2.) Extract the contents of this repository to the localhost web root

3.) Navigate to http://localhost/repository

-- To traverse directory contents and to look at files --

1.)  Just click the corrosponding file or directory icon

-- To run the unit tests --

1.) Navigate to the "/bin" directory

2.) Install PHPunit with the shell command 'php composer.phar install'

3.) Navigate to the "/tests" directory

4.) Run the unit tests with the shell command 'phpunit myfilemgrtests'
