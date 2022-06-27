CREATE TABLE IF NOT EXISTS usuarios (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(75) NULL,
  last_name VARCHAR(75) NULL,
  email VARCHAR(255) NOT NULL,
  passwordd VARCHAR(255) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE INDEX UQ_usuarios_name(first_name),
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS mascota (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(75) NULL,
  PRIMARY KEY(id),
  UNIQUE INDEX UQ_mascota_name(name),
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS tips (
  id VARCHAR(2) NOT NULL,
  name VARCHAR(45) NOT NULL,
  usuario_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY(id),
  UNIQUE KEY UQ_tips_name(name)
  CONSTRAINT FK_usuario_tips_id FOREIGN KEY(usuario_id) REFERENCES usuarios(id)  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS adopcion (
  id VARCHAR(4) NOT NULL,
  mascota_name VARCHAR(45) NOT NULL,
  mascota_id VARCHAR(2) NOT NULL,
  usuario_adoptante VARCHAR(45) NOT NULL, 
  PRIMARY KEY(id),
  UNIQUE KEY UQ_mascota_name_mascota_id(mascota_name, usuario_adoptante),
  CONSTRAINT FK_mascota_name_id FOREIGN KEY(mascota_id) REFERENCES mascota(id)
  CONSTRAINT FK_usuario_name_id FOREIGN KEY(usuario_adoptante) REFERENCES usuarios(first_name)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

