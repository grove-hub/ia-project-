import { NextRequest, NextResponse } from 'next/server';

// Mock data pour les alertes
const mockAlerts = [
  {
    id: 1,
    name: "Déchets dangereux",
    keywords: ["déchets dangereux", "DEEE", "produits chimiques"],
    jurisdiction: "France",
    frequency: "quotidienne",
    lastTriggered: "2024-01-15",
    isActive: true,
    notifications: 12
  },
  {
    id: 2,
    name: "REP Emballages",
    keywords: ["REP", "emballages", "responsabilité élargie"],
    jurisdiction: "UE",
    frequency: "hebdomadaire",
    lastTriggered: "2024-01-14",
    isActive: true,
    notifications: 8
  }
];

export async function GET() {
  try {
    // const { searchParams } = new URL(request.url);
    // const userId = searchParams.get('userId') || 'demo-user';

    // Simulation de délai
    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      alerts: mockAlerts,
      total: mockAlerts.length
    });

  } catch (error) {
    console.error('Erreur API alerts GET:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors de la récupération des alertes'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, keywords, jurisdiction, frequency } = body;

    // Validation des données
    if (!name || !keywords || !jurisdiction || !frequency) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Données manquantes',
          message: 'Tous les champs sont requis pour créer une alerte'
        },
        { status: 400 }
      );
    }

    // Simulation de création d'alerte
    const newAlert = {
      id: Date.now(),
      name,
      keywords: Array.isArray(keywords) ? keywords : [keywords],
      jurisdiction,
      frequency,
      lastTriggered: null,
      isActive: true,
      notifications: 0,
      createdAt: new Date().toISOString()
    };

    // Simulation de délai
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      alert: newAlert,
      message: 'Alerte créée avec succès'
    });

  } catch (error) {
    console.error('Erreur API alerts POST:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors de la création de l\'alerte'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ID manquant',
          message: 'L\'ID de l\'alerte est requis'
        },
        { status: 400 }
      );
    }

    // Simulation de mise à jour
    const updatedAlert = {
      id,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      alert: updatedAlert,
      message: 'Alerte mise à jour avec succès'
    });

  } catch (error) {
    console.error('Erreur API alerts PUT:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors de la mise à jour de l\'alerte'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ID manquant',
          message: 'L\'ID de l\'alerte est requis'
        },
        { status: 400 }
      );
    }

    // Simulation de suppression
    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      message: 'Alerte supprimée avec succès'
    });

  } catch (error) {
    console.error('Erreur API alerts DELETE:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors de la suppression de l\'alerte'
      },
      { status: 500 }
    );
  }
}
