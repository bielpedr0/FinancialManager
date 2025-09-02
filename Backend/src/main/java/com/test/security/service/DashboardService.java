package com.test.security.service;

import com.test.security.controller.dto.response.DashboardSummaryDTO;
import com.test.security.domain.entity.User;

public interface DashboardService {
    DashboardSummaryDTO getMonthlySummary(User user, Integer month, Integer year);
}
