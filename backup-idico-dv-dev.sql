CREATE SCHEMA idicodvdev DEFAULT CHARACTER SET utf8;
USE idicodvdev;

CREATE TABLE idi_ma_kind (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE idi_ma_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    lastname VARCHAR(100),
    mail VARCHAR(100) UNIQUE,
    birthdate DATE,
    phone VARCHAR(20),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE idi_ma_credentials (
    user_id INT PRIMARY KEY,
    password VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES idi_ma_users(id)
);

CREATE TABLE idi_ma_characters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255),
    name VARCHAR(255),
    age INT,
    weight DECIMAL(5, 2),
    history TEXT,
    deletedAt DATETIME DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE idi_ma_genders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) UNIQUE,
    image VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE idi_ma_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200),
    image VARCHAR(255),
    created_date DATE,
    qualification ENUM('1', '2', '3', '4', '5'),
    gender_id INT,
    kind_id INT,
    deletedAt DATETIME DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (gender_id) REFERENCES idi_ma_genders(id),
    FOREIGN KEY (kind_id) REFERENCES idi_ma_kind(id)
);

CREATE TABLE idi_re_characters_products (
    character_id INT,
    product_id INT,
    PRIMARY KEY (character_id, product_id),
    FOREIGN KEY (character_id) REFERENCES idi_ma_characters(id),
    FOREIGN KEY (product_id) REFERENCES idi_ma_products(id)
);

INSERT INTO idi_ma_kind (name) VALUES 
('Serie'),
('Pelicula');

INSERT INTO idi_ma_genders (name, image) VALUES 
('Aventura', 'AventuraGenero.jpg'), 
('Animales', 'AnimalesGenero.jpg'), 
('Fantasía', 'FantasiaGenero.jpg');

INSERT INTO idi_ma_products (title, image, created_date, qualification, gender_id, kind_id)
VALUES
('Mickey Mouse', 'MickeyMouseMovie.jpg', '1930-05-13', '5', 1, 1),
('Toy Story', 'ToyStoryMovie.jpg', '1995-12-25', '5', 1, 2),
('El Rey Leon', 'ElReyLeonMovie.jpg', '1994-06-30', '5', 2, 2),
('La Sirenita', 'LaSirenitaMovie.jpg', '1989-11-17', '5', 3, 1),
('Blanca Nieves', 'BlancaNievesMovie.jpg', '1937-12-21', '5', 3, 2),
('Malefica', 'MaleficaMovie.jpg', '2014-05-30', '5', 3, 2),
('Cenicienta', 'CenicientaMovie.jpg', '1950-03-04', '5', 3, 2),
('Aladdin', 'AladdinMovie.jpg', '1992-11-25', '5', 1, 2);

INSERT INTO idi_ma_characters (image, name, age, weight, history) VALUES 
('MickeyMouse.jpg', 'Mickey Mouse', 93, 23.5, 'Mickey Mouse es un personaje ficticio de Walt Disney. Es un ratón antropomórfico que caracteriza por su guantes blancos y pantalones rojos.'),
('MinnieMouse.jpg', 'Minnie Mouse', 92, 20.0, 'Minnie Mouse es la novia de Mickey Mouse. Es conocida por su vestido con lunares rojos y su lazo.'),
('DonaldDuck.jpg', 'Donald Duck', 87, 30.0, 'Donald Duck es un personaje ficticio de Disney, es un pato antropomórfico blanco con pico amarillo y piernas y pies anaranjados. Es amigo de Mickey Mouse.'),
('DaisyDuck.png', 'Daisy Duck', 77, 26.0, 'Daisy Duck es una pata antropomórfica que apareció por primera vez en 1940 en la serie de dibujos animados El club de los tres caballeros. Es amiga de Minnie Mouse.'),
('Goofy.png', 'Goofy', 90, 45.0, 'Goofy es un personaje de Disney conocido por su torpeza y su personalidad alegre. Es un perro antropomórfico y amigo de Mickey Mouse y Donald Duck.'),
('Pluto.png', 'Pluto', 91, 12.0, 'Pluto es otro perro de Disney, pero a diferencia de Goofy, Pluto no habla y se comporta como un perro normal. Es la mascota de Mickey Mouse.'),
('Woody.jpg', 'Woody', 26, 30.0, 'Woody es un personaje ficticio de las películas Toy Story de Disney-Pixar. Es un vaquero de juguete y el líder de los juguetes de Andy.'),
('Buzzlightyear.jpg', 'Buzz Lightyear', 26, 50.0, 'Buzz Lightyear es un personaje ficticio de la franquicia Toy Story de Disney-Pixar. Es un muñeco espacial y es uno de los juguetes de Andy.'),
('Jessie.jpg', 'Jessie', 25, 40.0, 'Jessie es un personaje ficticio de las películas Toy Story de Disney-Pixar. Es una vaquera de juguete y amiga de Woody y Buzz Lightyear.'),
('Rex.jpg', 'Rex', 26, 35.0, 'Rex es un personaje ficticio de la franquicia Toy Story de Disney-Pixar. Es un dinosaurio de juguete que tiene miedo a todo.'),
('Simba.png', 'Simba', 30, 180.0, 'Simba es un personaje ficticio y el protagonista de la película de Disney El Rey León. Es un león que se convierte en el rey de la selva.'),
('Mufasa.jpg', 'Mufasa', 45, 300.0, 'Mufasa es un personaje ficticio de la película de Disney El Rey León. Es el padre de Simba y el rey de la selva hasta que es asesinado por su hermano Scar.'),
('Scar.jpg', 'Scar', 42, 280.0, 'Scar es un personaje ficticio de la película de Disney El Rey León. Es el tío de Simba y el principal antagonista de la película.'),
('Nala.jpg', 'Nala', 30, 160.0, 'Nala es un personaje ficticio de la película de Disney El Rey León. Es la amiga de la infancia de Simba y más tarde su esposa.'),
('Timon.jpg', 'Timón', 25, 20.0, 'Timón es un suricata y uno de los personajes principales de la película de Disney El Rey León. Es conocido por ser el mejor amigo de Pumba y su filosofía "Hakuna Matata".'),
('Pumba.webp', 'Pumba', 25, 200.0, 'Pumba es un jabalí y uno de los personajes principales de la película de Disney El Rey León. Es conocido por su olor y su filosofía "Hakuna Matata".'),
('Ariel.jpg', 'Ariel', 20, 55.0, 'Ariel es un personaje ficticio y la protagonista de la película de Disney La Sirenita. Es una sirena que sueña con vivir en la tierra firme.'),
('Eric.webp', 'Eric', 24, 80.0, 'Eric es un personaje ficticio de la película de Disney La Sirenita. Es un príncipe humano que se enamora de Ariel.'),
('Ursula.jpg', 'Úrsula', 45, 350.0, 'Úrsula es un personaje ficticio de la película de Disney La Sirenita. Es una bruja del mar que busca venganza contra el reino de Tritón y quiere gobernar los mares.'),
('BlancaNieves.jpg', 'Blanca Nieves', 92, 45.0, 'Blanca Nieves es un personaje ficticio y la protagonista de la película de Disney Blancanieves y los siete enanitos. Es una princesa que escapa de su malvada madrastra y se refugia con siete enanitos.'),
('LaReinaGrimhilde.jpg', 'La Reina Grimhilde', 95, 60.0, 'La Reina Grimhilde es un personaje ficticio de la película de Disney Blancanieves y los siete enanitos. Es la malvada madrastra de Blancanieves.'),
('Aurora.jpg', 'Aurora', 24, 50.0, 'Aurora es un personaje ficticio y la protagonista de la película de Disney La Bella Durmiente. Es una princesa que cae en un sueño profundo por una maldición de Maléfica.'),
('Malefica.webp', 'Maléfica', 150, 200.0, 'Maléfica es un personaje ficticio de la película de Disney La Bella Durmiente. Es una hechicera que lanza una maldición a la princesa Aurora.'),
('Cenicienta.jpg', 'Cenicienta', 70, 45.0, 'Cenicienta es un personaje ficticio y la protagonista de la película de Disney Cenicienta. Es una joven que sufre el abuso de su madrastra y hermanastras pero gracias a su hada madrina, asiste al baile real y conoce al príncipe.'),
('HadaMadrina.webp', 'Hada Madrina', 500, 100.0, 'El hada madrina es un personaje ficticio de la película de Disney Cenicienta. Es un hada que ayuda a Cenicienta a asistir al baile real.'),
('Jasmine.webp', 'Jasmine', 20, 55.0, 'Jasmine es un personaje ficticio y la protagonista de la película de Disney Aladdín. Es la princesa de Agrabah y se niega a casarse con los pretendientes que su padre le presenta.'),
('Aladdin.jpg', 'Aladdín', 22, 65.0, 'Aladdín es un personaje ficticio y el protagonista de la película de Disney Aladdín. Es un joven ladrón callejero que se enamora de la princesa Jasmine. Con la ayuda de un genio mágico, Aladdín intenta ganarse el corazón de Jasmine y derrotar al malvado Jafar.');

INSERT INTO idi_re_characters_products (character_id, product_id)
VALUES 
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 2), (8, 2), (9, 2), (10, 2), (11, 3), 
(12, 3), (13, 3), (14, 3), (15, 3), (16, 3), (17, 4), (18, 4), (19, 4), (20, 5), (21, 5), 
(22, 6), (23, 6), (24, 7), (25, 7), (26, 8), (27, 8);