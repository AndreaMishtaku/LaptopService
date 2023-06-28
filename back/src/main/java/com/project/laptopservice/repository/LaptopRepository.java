package com.project.laptopservice.repository;

import com.project.laptopservice.model.Laptop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LaptopRepository extends JpaRepository<Laptop,Long>, JpaSpecificationExecutor<Laptop> {

    List<Laptop> findByUserId(Long id);
}
