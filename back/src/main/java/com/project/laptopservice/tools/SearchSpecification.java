package com.project.laptopservice.tools;

import com.project.laptopservice.payload.pagination.Column;
import com.project.laptopservice.payload.pagination.DataType;
import com.project.laptopservice.payload.pagination.Filter;
import com.project.laptopservice.payload.pagination.Operation;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class SearchSpecification<T> implements Specification<T> {
    private List<Filter> filters;
    private String search;

    private List<Column> columns;

    private List<Filter> internalFilters;

    public SearchSpecification(List<Filter> filters, String search,List<Column> columns,List<Filter> internalFilters) {
        this.filters = filters;
        this.search = search;
        this.columns=columns;
        this.internalFilters=internalFilters;
    }

    public SearchSpecification(List<Filter> filters, String search,List<Column> columns) {
        this.filters = filters;
        this.search = search;
        this.columns=columns;
        this.internalFilters=new ArrayList<>();
    }

    @Override
    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        List<Predicate> predicates = new ArrayList<>();

        for (Filter filter : filters) {
            String key = filter.getKey();
            Operation operation =filter.getOperation();
            Object value = filter.getValue();

            Path<?> keyPath = resolveKeyPath(root, key);
            predicates.add(buildPredicate(builder, keyPath, operation, value));
        }

        for(Filter internalFilter:internalFilters){
            String key = internalFilter.getKey();
            Operation operation =internalFilter.getOperation();
            Object value = internalFilter.getValue();

            Path<?> keyPath = resolveKeyPath(root, key);
            predicates.add(buildPredicate(builder, keyPath, operation, value));
        }


        if (search != null && !search.isEmpty()) {
            List<Predicate> orConditions = new ArrayList<>();
            for (Column c: columns) {
                if(c.getHidden().equals(false)){
                    Path<?> keyPath = resolveKeyPath(root,c.getFilterProperty());
                    DataType dataType = c.getType();
                    if (dataType.equals(DataType.STRING)) {
                        orConditions.add(builder.like((Expression<String>) keyPath, "%" + search + "%"));
                    } else if (dataType.equals(DataType.NUMBER)) {
                        Expression<String> keyPathString = keyPath.as(String.class);
                        orConditions.add(builder.like(keyPathString, "%" + search + "%"));
                    } else if (dataType.equals(DataType.DATE)) {
                        Expression<String> keyPathString = keyPath.as(String.class);
                        orConditions.add(builder.like(keyPathString, "%" + search + "%"));
                    }
                }
            }
            predicates.add(builder.or(orConditions.toArray(new Predicate[0])));
        }

        return builder.and(predicates.toArray(new Predicate[0]));
    }

    private Path<?> resolveKeyPath(Root<T> root, String key) {
        String[] attributeNames = key.split("\\.");

        Path<?> keyPath = root;
        for (String attributeName : attributeNames) {
            keyPath = keyPath.get(attributeName);
        }

        return keyPath;
    }

    private Predicate buildPredicate(CriteriaBuilder builder, Path<?> keyPath, Operation operation, Object value) {
        switch (operation) {
            case EQUAL:
                if(keyPath.getJavaType().equals(LocalDateTime.class)){
                    try{
                        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
                        LocalDateTime dateTime = LocalDateTime.parse(value.toString().trim().length()==10? value+" 00:00":value.toString(), formatter);
                        return  builder.equal(keyPath,dateTime);
                    }catch (Exception e){
                        throw new IllegalArgumentException("Condition is not correct");
                    }
                }else if(keyPath.getJavaType().equals(Integer.class)||keyPath.getJavaType().equals(Double.class)||keyPath.getJavaType().equals(Long.class)){
                    try{
                        Number number=(Number) value;
                        return  builder.equal(keyPath,number);
                    }catch (Exception e){
                        throw new IllegalArgumentException("Condition is not correct");
                    }
                }else if(keyPath.getJavaType().equals(String.class)){
                    try{
                        String string=(String) value;
                        return  builder.equal(keyPath,string);
                    }catch (Exception e){
                        throw new IllegalArgumentException("Condition is not correct");
                    }
                }else{
                    throw new IllegalArgumentException("This kind of condition is not supported.");
                }
            case LIKE:
                if(keyPath.getJavaType().equals(String.class)){
                    try{
                        String string=(String) value;
                        return  builder.like((Expression<String>) keyPath,"%" + string.toLowerCase() + "%");
                    }catch (Exception e){
                        throw new IllegalArgumentException("Condition is not correct");
                    }
                }else{
                    throw new IllegalArgumentException("This kind of condition is not supported.");
                }
            case GREATER_THAN:
                if(keyPath.getJavaType().equals(LocalDateTime.class)){
                    try{
                        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
                        LocalDateTime dateTime = LocalDateTime.parse(value.toString().trim().length()==10? value+" 00:00":value.toString(), formatter);
                        Expression<LocalDateTime> dateTimeExpression = keyPath.as(LocalDateTime.class);
                        return  builder.greaterThan(dateTimeExpression,dateTime);
                    }catch (Exception e){
                        throw new IllegalArgumentException("Condition is not correct");
                    }
                }else if(keyPath.getJavaType().equals(Integer.class)||keyPath.getJavaType().equals(Double.class)||keyPath.getJavaType().equals(Long.class)){
                    try{
                        Number number=(Number) value;
                        Expression<Number> numberPath = keyPath.as(Number.class);
                        return  builder.gt(numberPath,number);
                    }catch (Exception e){
                        throw new IllegalArgumentException("Condition is not correct");
                    }
                }else{
                    throw new IllegalArgumentException("This kind of condition is not supported.");
                }
            case LESS_THAN:
                if(keyPath.getJavaType().equals(LocalDateTime.class)){
                    try{

                        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
                        LocalDateTime dateTime = LocalDateTime.parse(value.toString().trim().length()==10? value+" 00:00":value.toString(), formatter);
                        Expression<LocalDateTime> dateTimeExpression = keyPath.as(LocalDateTime.class);
                        return  builder.lessThan(dateTimeExpression,dateTime);
                    }catch (Exception e){
                        throw new IllegalArgumentException("Condition is not correct");
                    }
                }else if(keyPath.getJavaType().equals(Integer.class)||keyPath.getJavaType().equals(Double.class)||keyPath.getJavaType().equals(Long.class)){
                    try{
                        Number number=(Number) value;
                        Expression<Number> numberPath = keyPath.as(Number.class);
                        return  builder.lt(numberPath,number);
                    }catch (Exception e){
                        throw new IllegalArgumentException("This kind of kondition is not correct");
                    }
                }
            default:
                throw new IllegalArgumentException("Operation not valid");
        }
    }
}
