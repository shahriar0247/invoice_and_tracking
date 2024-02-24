"""Descriptionasd  of changes

Revision ID: 02727c2a2b5a
Revises: 
Create Date: 2024-01-21 23:28:45.729610

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '02727c2a2b5a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():

    with op.batch_alter_table('shipment', schema=None) as batch_op:
        batch_op.alter_column('id',
               existing_type=sa.VARCHAR(length=20),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('shipment', schema=None) as batch_op:
        batch_op.alter_column('id',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)

    with op.batch_alter_table('purchase__order', schema=None) as batch_op:
        batch_op.alter_column('invoice_id',
               existing_type=sa.Integer(),
               type_=sa.VARCHAR(length=20),
               existing_nullable=True)
        batch_op.alter_column('id',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)

    with op.batch_alter_table('item_history', schema=None) as batch_op:
        batch_op.alter_column('id',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)

    with op.batch_alter_table('item', schema=None) as batch_op:
        batch_op.alter_column('price',
               existing_type=sa.Float(precision=5),
               type_=sa.REAL(),
               existing_nullable=True)
        batch_op.drop_column('vendor_cost')

    with op.batch_alter_table('invoice', schema=None) as batch_op:
        batch_op.alter_column('all_items',
               existing_type=sa.String(length=500),
               type_=sa.VARCHAR(length=1200),
               existing_nullable=True)
        batch_op.alter_column('id',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)

    with op.batch_alter_table('daily__account', schema=None) as batch_op:
        batch_op.alter_column('id',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)

    # ### end Alembic commands ###