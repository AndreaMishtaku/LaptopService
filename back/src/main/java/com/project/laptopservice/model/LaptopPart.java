package com.project.laptopservice.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "laptop_parts")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LaptopPart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="description")
    @Lob
    private String description;

    @Column(name="price")
    private Double price;

    @Column(name="stock")
    private Integer stock;

    @CreationTimestamp
    @Column(name="created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "laptopPart",fetch = FetchType.LAZY)
    private Set<Ticket> tickets;
}
