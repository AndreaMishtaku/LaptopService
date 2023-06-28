package com.project.laptopservice.repository;

import com.project.laptopservice.model.LaptopPart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface LaptopPartRepository extends JpaRepository<LaptopPart,Long> , JpaSpecificationExecutor<LaptopPart> {
}
