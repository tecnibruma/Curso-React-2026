package com.tecnibruma.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.tecnibruma.ecommerce.model.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Al extender de JpaRepository ya tenemos métodos listos como save, findAll, findById y delete.
}