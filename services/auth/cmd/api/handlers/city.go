package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"ride-sharing/services/auth/data"
	"time"
)

// ProvinceResponse represents the response from 34tinhthanh.com API for provinces
type ProvinceResponse struct {
	ProvinceCode string `json:"province_code"`
	Name         string `json:"name"`
}

// WardResponse represents the response from 34tinhthanh.com API for wards
type WardResponse struct {
	WardCode    string `json:"ward_code"`
	WardName    string `json:"ward_name"`
	ProvinceCode string `json:"province_code"`
}

// SyncCities syncs cities data from 34tinhthanh.com API
// @Summary Sync cities data
// @Description Fetches provinces and wards from 34tinhthanh.com API and stores them in database
// @Tags City
// @Accept json
// @Produce json
// @Success 200 {object} map[string]interface{}
// @Failure 500 {object} map[string]string
// @Router /api/v1/cities/sync [post]
func SyncCities(w http.ResponseWriter, r *http.Request, models *data.Models) {
	apiBaseURL := "https://34tinhthanh.com/api"
	
	log.Println("Starting cities sync from 34tinhthanh.com...")

	// Step 1: Fetch provinces
	provinces, err := fetchProvinces(apiBaseURL)
	if err != nil {
		log.Printf("Error fetching provinces: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": fmt.Sprintf("Failed to fetch provinces: %v", err),
		})
		return
	}

	// Step 2: Insert provinces into database
	provinceCount := 0
	for _, province := range provinces {
		city := data.City{
			Code:        province.ProvinceCode,
			Name:        province.Name,
			Type:        "province",
			ProvinceCode: "",
			ParentCode:  "",
		}
		_, err := models.City.Insert(city)
		if err != nil {
			log.Printf("Error inserting province %s: %v", province.ProvinceCode, err)
			continue
		}
		provinceCount++
	}

	log.Printf("Inserted %d provinces", provinceCount)

	// Step 3: Fetch and insert wards for each province
	wardCount := 0
	for _, province := range provinces {
		wards, err := fetchWards(apiBaseURL, province.ProvinceCode)
		if err != nil {
			log.Printf("Error fetching wards for province %s: %v", province.ProvinceCode, err)
			continue
		}

		for _, ward := range wards {
			city := data.City{
				Code:        ward.WardCode,
				Name:        ward.WardName,
				Type:        "ward",
				ProvinceCode: ward.ProvinceCode,
				ParentCode:  ward.ProvinceCode,
			}
			_, err := models.City.Insert(city)
			if err != nil {
				log.Printf("Error inserting ward %s: %v", ward.WardCode, err)
				continue
			}
			wardCount++
		}

		// Add delay to avoid rate limiting
		time.Sleep(100 * time.Millisecond)
	}

	log.Printf("Inserted %d wards", wardCount)

	response := map[string]interface{}{
		"message":        "Cities sync completed",
		"provincesCount": provinceCount,
		"wardsCount":     wardCount,
		"totalCount":     provinceCount + wardCount,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

// GetProvinces returns all provinces
// @Summary Get all provinces
// @Description Returns all provinces from database
// @Tags City
// @Accept json
// @Produce json
// @Success 200 {array} data.City
// @Router /api/v1/cities/provinces [get]
func GetProvinces(w http.ResponseWriter, r *http.Request, models *data.Models) {
	provinces, err := models.City.GetAllProvinces()
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": fmt.Sprintf("Failed to get provinces: %v", err),
		})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(provinces)
}

// GetWards returns wards by province code
// @Summary Get wards by province code
// @Description Returns all wards for a specific province
// @Tags City
// @Accept json
// @Produce json
// @Param province_code path string true "Province Code"
// @Success 200 {array} data.City
// @Router /api/v1/cities/provinces/{province_code}/wards [get]
func GetWards(w http.ResponseWriter, r *http.Request, models *data.Models, provinceCode string) {
	wards, err := models.City.GetWardsByProvinceCode(provinceCode)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": fmt.Sprintf("Failed to get wards: %v", err),
		})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(wards)
}

// Helper function to fetch provinces from API
func fetchProvinces(apiBaseURL string) ([]ProvinceResponse, error) {
	url := fmt.Sprintf("%s/provinces", apiBaseURL)
	
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API returned status code: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var provinces []ProvinceResponse
	if err := json.Unmarshal(body, &provinces); err != nil {
		return nil, err
	}

	return provinces, nil
}

// Helper function to fetch wards from API
func fetchWards(apiBaseURL string, provinceCode string) ([]WardResponse, error) {
	url := fmt.Sprintf("%s/wards?province_code=%s", apiBaseURL, provinceCode)
	
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API returned status code: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var wards []WardResponse
	if err := json.Unmarshal(body, &wards); err != nil {
		return nil, err
	}

	return wards, nil
}

