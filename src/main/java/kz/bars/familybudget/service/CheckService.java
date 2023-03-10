package kz.bars.familybudget.service;

import kz.bars.familybudget.dto.CheckDto;

import java.time.LocalDate;
import java.util.List;

public interface CheckService {
    CheckDto getCheckDto(Long id);
    CheckDto addCheckDto(CheckDto checkDto);
    CheckDto updateCheckDto(CheckDto checkDto);
    void deleteCheckDto(Long id);
    List<CheckDto> getAllCheckDto();
    List<CheckDto> getAllCheckBetweenDateDto(LocalDate dateFrom, LocalDate dateTo);
    List<CheckDto> getAllCheckByBudgetIdDto(Long id);
    List<CheckDto> getAllCheckByBudgetBetweenDateDto(Long id, LocalDate dateFrom, LocalDate dateTo);
    List<CheckDto> getAllCheckByPurchaseIdDto(Long id);
    List<CheckDto> getAllCheckByPurchaseBetweenDateDto(Long id, LocalDate dateFrom, LocalDate dateTo);

}
