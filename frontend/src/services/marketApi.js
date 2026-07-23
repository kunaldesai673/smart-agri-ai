/* ==========================================================
   AcreSignal - Localized Market Intelligence Service Layer
   ========================================================== */

const PRICE_API_BASE =
  window.location.hostname === "localhost"
    ? "http://127.0.0.1:5002"
    : "https://smart-agri-ai-7tg9.onrender.com";

/**
 * Fetches predictive time-series arrays for a selected commodity.
 * @param {string} crop - The name of the target crop (e.g., 'Wheat')
 * @returns {Promise<Object>} The compiled backend analytics packet
 */
export const fetchCropPrediction = async (crop) => {
  try {
    const response = await fetch(`${PRICE_API_BASE}/predict-price?crop=${crop}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    
    const data = await response.json();
    if (data.success) {
      return data;
    } else {
      throw new Error(data.error || "Prediction returned unsuccessful flag.");
    }
  } catch (error) {
    console.error("API Service Error [fetchCropPrediction]:", error);
    throw error;
  }
};

/**
 * Dispatches a regional SMS broadcast transmission to grower networks.
 * @param {Object} payload - The compiled data attributes to broadcast
 * @returns {Promise<Object>} Server success payload
 */
export const sendFarmerAlert = async (payload) => {
  try {
    const response = await fetch(`${PRICE_API_BASE}/send-alert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Service Error [sendFarmerAlert]:", error);
    throw error;
  }
};