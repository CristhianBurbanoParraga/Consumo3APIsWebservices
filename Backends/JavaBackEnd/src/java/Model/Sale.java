
package Model;

public class Sale {
    
    private int id;
    private String nameProduct;
    private String namePerson;
    private int quantity;
    private double total;
    private String observation;

    public Sale() {
    }

    public Sale(int id, String nameProduct, String namePerson, int quantity, double total, String observation) {
        this.id = id;
        this.nameProduct = nameProduct;
        this.namePerson = namePerson;
        this.quantity = quantity;
        this.total = total;
        this.observation = observation;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNameProduct() {
        return nameProduct;
    }

    public void setNameProduct(String nameProduct) {
        this.nameProduct = nameProduct;
    }

    public String getNamePerson() {
        return namePerson;
    }

    public void setNamePerson(String namePerson) {
        this.namePerson = namePerson;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }
    
}
