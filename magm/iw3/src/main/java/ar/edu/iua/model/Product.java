package ar.edu.iua.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//OBLIGATORIO: poner @Entity y decirle cual es la clave principal @id

@Entity //Entity hace que esta clase producto sea una tabla en la base de datos
@Table(name="products")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 100, unique = true)
    private String product;

    @Column(columnDefinition = "tinyint default 0")
    private boolean stock = false;

    private double precio;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
}
